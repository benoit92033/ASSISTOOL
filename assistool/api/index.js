module.exports = (req, res, next) => {
    
    // Get the session ID:
    
 
    // Assign some value to session:
    if(req.session.isLogged == undefined) {
        req.session.user = [];
        req.session.isLogged = false;


        console.log("session start...")
        console.log("session id : "+req.session.id);
        console.log("session logged : "+req.session.isLogged);
    }
    
    next();
}
/*
const mysql = require('mysql')
const express = require('express')
const bodyParser = require('body-parser');

const app = express()
const router = express.Router()

app.use('/api', router)

router.use((req, res, next) => {
    Object.setPrototypeOf(req, app.request)
    Object.setPrototypeOf(res, app.response)
    req.res = res
    res.req = req
    next()
  })

*/
