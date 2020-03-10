const express = require('express')
const consola = require('consola')
<<<<<<< HEAD
const { Nuxt, Builder } = require('nuxt')
var mysql = require('mysql');
require('dotenv').config()


=======
const session = require('express-session')
const helmet = require('helmet')
const mysql = require('mysql')
const { Nuxt, Builder } = require('nuxt')
const app = express()
require('dotenv').config();
>>>>>>> 22063444c3d4a571f3989f55c942e0d31c3f725b


const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

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
<<<<<<< HEAD
console.log(process.env.DB_HOST)
console.log(process.env.DB_USER)
console.log(process.env.DB_PASS)
console.log(process.env.DB_NAME)

var con = mysql.createConnection({

  host: '90.114.67.60',
  port:3307,
  username: 'root',
  password: 'CAxKtT5y',
  database: 'tickets'
});

con.connect();
con.query(`SELECT * FROM user`, function(err, data){
    if(err) return console.error(err);
    else {
        console.log("data : ", data);
    }
})
=======

console.log(process.env.DB_HOST)

var con = mysql.createConnection({
  port:3306,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
}); 

con.connect(function(err){
  if(err) throw err;
});
/*
con.query('SELECT * from user', function(err, rows, fields) {
    if(err) console.log(err);
    console.log('The solution is: ', rows);
    con.end();
});*/
>>>>>>> 22063444c3d4a571f3989f55c942e0d31c3f725b
