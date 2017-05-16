'use strict'
require('babel-register')
var express = require('express')
var ejs = require('ejs')
var serveStatic = require('serve-static')
var routes = require('./routes')
var api = require('./api')

// Setup express app
var app = express()
app.engine('html', ejs.renderFile)
app.set('view engine', 'html')
app.set('views', './templates')

// Serve static assets
app.use('/static', serveStatic('./build'))

// Setup the front-end routes
routes(app)

// Setup the api routes
api(app)

// Start server, once started call done
var server = app.listen(1337, function (err) {
  if (err) {
    return console.error(err)
  }
  console.log('Starting server on port ' + server.address().port)
})
