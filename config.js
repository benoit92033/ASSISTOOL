var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tickets"
});

con.connect(function(err){
  if (err) throw err;
  console.log("DB connected !");
});

module.exports = con;