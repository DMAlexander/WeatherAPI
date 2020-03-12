#!/usr/bin/env node

var app = require('../index');
var pg = require('../lib/postgres');

var DATABASE_URL = 'postgres://postgres@localhost/api'
// Connect to database
pg.initialize(DATABASE_URL, function(err) {
  if (err) {
    throw err;
  }

// Which port to listen on
app.set('port', process.env.PORT || 3000);

// Start listening for HTTP requests
var server = app.listen(app.get('port'), function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App is listening', host, port);
});

  
});
