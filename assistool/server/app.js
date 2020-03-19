const express = require('express')
const session = require('express-session')
const helmet = require('helmet')
const mysql = require('mysql')
const bodyParser = require('body-parser');
const app = express()
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// session middleware
app.use(
  session({
    secret: 'super-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000, httpOnly: false }
  })
)

// Create express router
const router = express.Router()

var con = mysql.createConnection({
    port: 3306,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})
  
con.connect(function(err) {
if (err) throw err
consola.ready({
    message: `Database Connected !`,
    badge: true
})
})

router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

// Add POST - /api/login
router.post('/login', (req, res) => {
  if (req.body.username === 'demo' && req.body.password === 'demo') {
    req.session.authUser = { username: 'demo' }
    req.session.expires = req.session.cookie.expires.getTime()
    return res.json({ username: 'demo', expires: req.session.expires })
  }
  res.status(401).json({ message: 'Bad credentials' })
})

// Add POST - /api/logout
router.post('/logout', (req, res) => {
  delete req.session.authUser
  delete req.session.expires
  res.json({ ok: true })
})

var jsonParser = bodyParser.json()

router.post('/getUser', jsonParser, function(req,res){

    let data = res.connection.parser.incoming.body;

    con.query('SELECT * FROM user WHERE mail = "'+data.email+'"',
        function (err, results, fields){
            if(err) throw err;

            if(results[0].password == data.password) {

            req.session.user[0] = results[0];
            req.session.isLogged = true;

            console.log("ROUTER POST")
            console.log(req.session)

            res.json(results[0]);

            } else { res.json(null); }
        }
    )
})

router.post('/newTicket', jsonParser,function(req,res){
  
    let data = res.connection.parser.incoming.body;

    let rqt = 'select id_user from user u '+
              'left join tickets t ON u.id_user = t.id_technicien '+
              'join qualification q on u.id_user = q.id_technicien '+
              'where qualification = \''+ data.probleme +
              '\' and t.id_ticket IS NULL'

    let rqt2 = 'select id_user, count(*) as count from user u '+
               'left join tickets t ON u.id_user = t.id_technicien '+
               'join qualification q on u.id_user = q.id_technicien '+
               'where qualification = \''+ data.probleme +
               '\' group by 1 order by count asc'

    con.query(rqt,
        function (err, results, fields){
            //if(err) throw err;
            if(results.length == 0) {

              con.query(rqt2,
                function (err, results, fields){
                    //if(err) throw err;
                    if(results.length == 0) {
                      console.log("aucun résultat, mais c'est pas censé ce produite, ya un bug là")
                    }
                    else {
                      newTicket(results[0].id_user, data,res)
                    }

                }
            )
            }
            else {
              newTicket(results[0].id_user, data,res)
            }

        }
    )
})

router.get('/getTickets/',function(req,res){
    con.query('SELECT * FROM tickets WHERE id_demandeur = ' + req.query.id_user +' OR id_technicien = '+ req.query.id_user,
        function (err, results, fields){
            if(err) throw err;
            res.json(results)
        }
    )
})

router.get('/getComments/',function(req,res){
    con.query('SELECT c.commentaire, c.id_ticket, u.id_user, u.nom, u.prenom FROM commentaire c JOIN tickets t ON c.id_ticket = t.id_ticket JOIN user u ON c.id_user = u.id_user WHERE c.id_ticket = ' + req.query.id_ticket,
        function (err, results, fields){
            if(err) throw err;
            res.json(results)
        }
    )
})

router.post('/closeTicket', jsonParser,function(req,res){
    let data = res.connection.parser.incoming.body;

    console.log(GetCurrentDate())
    con.query('UPDATE `tickets` SET `date_cloture` = "'+GetCurrentDate()+'" WHERE `tickets`.`id_ticket` = ' + data.id_ticket,
        function (err, results, fields){
            if(err) throw err;
            res.send(true)
        }
    )
})

router.post('/postComments', jsonParser,function(req,res){
    let data = res.connection.parser.incoming.body;

    con.query("INSERT INTO commentaire (id_user,id_ticket,commentaire) VALUES (" + data.id_user + " , " + data.id_Ticket +" , '" + escapeHtml(data.commentaire) +"'  ) ",
        function (err, results, fields){
            if(err) throw err;
        res.send(true);
        }
    )
})

function newTicket(id_tech, data,res) {
con.query('INSERT INTO tickets(id_demandeur,id_technicien,titre,description,poste,date_creation,urgence,type) VALUES('+data.id_user+','+id_tech+',"'+data.title+'","'+data.description+'","'+data.poste+'","'+GetCurrentDate()+'",'+data.priority+',"'+data.probleme+'")',

    function (err, results, fields){
        if(err) throw err;
        res.send(true)
    }
)
}

function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
  
function GetCurrentDate(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //Janvier est 0
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    return today;
}

app.use('/api', router)

module.exports = app


/*
 
      // app.get('/postComments/',function(req,res){
      //   console.log("INSERT INTO commentaire (id_user,id_ticket,commentaire) VALUES (" + req.query.id_user + " , " + req.query.id_ticket +" , '" + req.query.com +"'  ) ")
      //   con.query("INSERT INTO commentaire (id_user,id_ticket,commentaire) VALUES (" + req.query.id_user + " , " + req.query.id_ticket +" , '" + req.query.com +"'  ) ",
      //       function (err, results, fields){
      //           if(err) throw err;
      //           res.json(results)
      //       }
      //   )
      // })
  


  */