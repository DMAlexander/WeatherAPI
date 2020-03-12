#!/usr/bin/env node

var app = require('../index');
var pg = require('../lib/postgres');

//var DATABASE_URL = 'postgres://username:password@localhost/api'
var DATABASE_URL = 'postgres://postgres@localhost/api'
// Connect to mysql database
pg.initialize(DATABASE_URL, function(err) {
  if (err) {
    throw err;
  }

//Below is copied from appurl.js
// Which port to listen on
app.set('port', process.env.PORT || 3000);

// Start listening for HTTP requests
var server = app.listen(app.get('port'), function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

  
});
