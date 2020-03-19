const express = require('express')
const consola = require('consola')
const session = require('express-session')
const helmet = require('helmet')
const mysql = require('mysql')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const bodyParser = require('body-parser');
require('dotenv').config()
const axios = require('axios')
path = require('path')

//app.use(HELMET());

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }




//console.log(process.env.DB_HOST)

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

var jsonParser = bodyParser.json()

    app.post('/getUser', jsonParser,function(req,res){

      let data = res.connection.parser.incoming.body;

      con.query('SELECT * FROM user WHERE mail = "'+data.email+'"',
          function (err, results, fields){
              if(err) throw err;

              if(results[0].password == data.password) {
                res.json(results[0]);
              } else {
                res.json(null);
              }
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


    app.post('/newTicket', jsonParser,function(req,res){

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



      /*con.query('INSERT INTO tickets VALUES',
          function (err, results, fields){
              if(err) throw err;
              res.json(results)
          }
      )*/

    })

    app.get('/getTickets/',function(req,res){
      con.query('SELECT * FROM tickets WHERE id_demandeur = ' + req.query.id_user +' OR id_technicien = '+ req.query.id_user,
          function (err, results, fields){
              if(err) throw err;
              res.json(results)
          }
      )
    })

    app.get('/getComments/',function(req,res){
      con.query('SELECT c.commentaire, c.id_ticket, u.id_user, u.nom, u.prenom FROM commentaire c JOIN tickets t ON c.id_ticket = t.id_ticket JOIN user u ON c.id_user = u.id_user WHERE c.id_ticket = ' + req.query.id_ticket,
          function (err, results, fields){
              if(err) throw err;
              res.json(results)
          }
      )
    })


    app.post('/closeTicket', jsonParser,function(req,res){
      let data = res.connection.parser.incoming.body;

      console.log(GetCurrentDate())
      con.query('UPDATE `tickets` SET `date_cloture` = "'+GetCurrentDate()+'" WHERE `tickets`.`id_ticket` = ' + data.id_ticket,
          function (err, results, fields){
              if(err) throw err;
              res.send(true)
          }
      )
    })

    // app.get('/postComments/',function(req,res){
    //   console.log("INSERT INTO commentaire (id_user,id_ticket,commentaire) VALUES (" + req.query.id_user + " , " + req.query.id_ticket +" , '" + req.query.com +"'  ) ")
    //   con.query("INSERT INTO commentaire (id_user,id_ticket,commentaire) VALUES (" + req.query.id_user + " , " + req.query.id_ticket +" , '" + req.query.com +"'  ) ",
    //       function (err, results, fields){
    //           if(err) throw err;
    //           res.json(results)
    //       }
    //   )
    // })

    app.post('/postComments', jsonParser,function(req,res){
      let data = res.connection.parser.incoming.body;



      con.query("INSERT INTO commentaire (id_user,id_ticket,commentaire) VALUES (" + data.id_user + " , " + data.id_Ticket +" , '" + escapeHtml(data.commentaire) +"'  ) ",
          function (err, results, fields){
              if(err) throw err;
          res.send(true);
          }
      )
    })

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()

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
