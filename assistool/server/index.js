const express = require('express')
const consola = require('consola')
const session = require('express-session')
const helmet = require('helmet')
const mysql = require('mysql')
const { Nuxt, Builder } = require('nuxt')
const app = express()
require('dotenv').config();


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


  // SESSION

  var loginPage = (req, res, next) => {
    console.log("login")
    console.log(this.$store)
  }

  var checkLoggedIn = (req, res, next) => req.session.loggedIn ? next() : res.redirect("/login");


  // CHECK ROUTES
  app.use("/login", loginPage);
  app.use("/tickets2", checkLoggedIn);
}
start()

console.log(process.env.DB_HOST)
/*
var con = mysql.createConnection({
  port:process.env.DB_PORT,
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