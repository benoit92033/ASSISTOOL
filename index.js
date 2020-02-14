let express = require('express');
const helmet = require('helmet');
let app = express();
// tous les fichier client (js /css / html) seront dans public
app.use(express.static('public'));

var con = require('./config.js');

app.get('/', function(req, res){
  res.redirect('/tickets');
});

app.get('/tickets', function(req, res){
  con.query("SELECT id, title, priority FROM ticket",
    function(err, result, fields){
      if (err) throw err;
      res.render(__dirname + '/view/index.ejs', {'tickets': result});
  });
});

app.get('/tickets/add', function(req, res){
    var sql = "INSERT INTO ticket SET ?";
    con.query(sql, {'title': req.query.title, 'priority': req.query.priority}, function(err, result){
      if (err) throw err;
      res.redirect('/tickets');
    });
});

app.get('/tickets/:id', function(req, res){
  var sql = "SELECT id, title, priority FROM ticket WHERE id= ?"
  con.query(sql,req.params.id,
    function(err, result, fields){
      if (err) throw err;
      res.json(result);
  });
});

app.get('/tickets/delete/:id', function(req, res){
  var sql = "DELETE FROM ticket WHERE id = ?";
  con.query(sql, req.params.id,
    function(err, result){
      if (err) throw err;
      res.redirect('/tickets');
  });
});




















app.listen(8088);