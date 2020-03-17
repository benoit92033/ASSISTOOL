const express = require('express')
const consola = require('consola')
const session = require('express-session')
const helmet = require('helmet')
const mysql = require('mysql')
const { Nuxt, Builder } = require('nuxt')
const app = express()
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

  app.get('/getUser',function(req,res){
      con.query('SELECT * FROM user',
          function (err, results, fields){
              if(err) throw err;
              res.json(results)
          }
      )
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












