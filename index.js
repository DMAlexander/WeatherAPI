var express = require('express');
var bodyParser = require('body-parser');

var app = express();
//app.use(bodyParser.json({ type: 'application/json' }));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

//Create the express router object for WeatherData
var weatherRouter = express.Router();
var postgres = require('./lib/postgres');

/*
app.get('/', (request, response) => {
// database.find({}, (err, data) => {
    response.json('Mission accomplished');
});
*/

//1) GET ALL ROWS
weatherRouter.get('/', function(req, res) { 
    var sql = 'SELECT * FROM weatherdata';
      postgres.client.query(sql, function(err, result) {
        if (err) {
          console.error(err);
          return res.json({ errors: ['Could not retrieve weather information'] });
        }
        console.log("Should have performed select all...");
        res.json(result.rows);
      });
});

//2) INSERT NEW ROW
weatherRouter.post('/', function(req, res) {
  var sql = 'INSERT INTO weatherData (temp, tempLow, tempHigh, windSpeed, comment) VALUES ($1,$2,$3,$4,$5) RETURNING id';
  console.log('sql: ' + sql);
  var data = [
    req.body.temp,
    req.body.tempLow,
    req.body.tempHigh,
    req.body.windSpeed,
    req.body.comment
  ];
  //Error...
  postgres.client.query(sql, data, function(err, result) {
    if (err) {
      console.err(err);
      return res.json({
        errors: ['Could not create weather data row']
      });
    }

    var weatherId = result.rows[0].id;
    var sql = 'SELECT * FROM weatherData WHERE id = $1';
    postgres.client.query(sql, [ weatherId ], function(err, result) {
      if (err) {
        console.error(err);
        return res.json({ errors: ['Could not retrieve weather data after create'] });
      }

      console.log("Insert succeeded");
      res.json(result.rows[0]);
    });
  });
});

  //3) GET BY ID
  weatherRouter.get('/:id', getId, function(req, res) {
    res.json(req.weatherData);
  });

  //4) UPDATE ROWS
  weatherRouter.patch('/:id/:comment', function(req, res) {
    console.log("Lets update!");
    var sql = 'UPDATE weatherdata SET COMMENT = $1 WHERE id = $2 ';
    console.log(sql);
    var weatherId = req.body.id;
    console.log("weatherId: " + weatherId);
    var data = [
      req.body.comment,
      req.body.id
    ];
    console.log('Comment' +req.body.comment) +
      'Weather Id' + weatherId;
    console.log("Second weather id is " + weatherId);
    postgres.client.query(sql, data, function(err, result) {
      if (err) {
        console.error(err);
        return res.json({ errors: ['Could not update weatherData']});
      }

      var sql = 'SELECT * FROM weatherData WHERE id = $1';
      postgres.client.query(sql, [ weatherId ], function(err, result) {
        if (err) {
          console.error(err);
          return res.json({ errors: ['Could not retrieve updated weather']});
        }
        console.log('New comment: ' + result.rows[0].comment);
        console.error('Update successful');
        res.json(result.rows[0]);
      });
    });
  });

  /*
  weatherRouter.patch('/:id', getId, function(req, res) {
    console.log("Lets update!");
    console.log('Weather data: ' +req.weatherData);
    var sql = 'UPDATE weatherdata SET TEMP = $1, TEMPLOW = $2, TEMPHIGH = $3, WINDSPEED = $4, COMMENT = $5 WHERE id = $6 ';
    console.log(sql);
  //  var weatherId = req.params.id;
    var weatherId = req.weatherData.id;
    console.log("weatherId: " + weatherId);
    var data = [
      req.body.temp,
      req.body.tempLow,
      req.body.tempHigh,
      req.body.windSpeed,
      req.body.comment,
      weatherId
    ];
    console.log('Temp: ' + req.body.temp +
      'Temp low' +req.body.templow + '' +
      'Temp high' +req.body.tempHigh +
      'Wind speed' +req.body.windSpeed +
      'Comment' +req.body.comment) +
      'Weather Id' + weatherId;
    console.log("Second weather id is " + weatherId);
    postgres.client.query(sql, data, function(err, result) {
      if (err) {
        console.error(err);
        return res.json({ errors: ['Could not update weatherData']});
      }
  
 //     var weatherId = result.rows[0].id;
      var sql = 'SELECT * FROM weatherData WHERE id = $1';
      postgres.client.query(sql, [ weatherId ], function(err, result) {
        if (err) {
          console.error(err);
          return res.json({ errors: ['Could not retrieve updated weather']});
        }
        console.error('Update successful');
        res.json(result.rows[0]);
      });
    });
  });
  */

//5) DELETE ROW
weatherRouter.delete('/:id', getId, function(req, res) {
  var sql = 'DELETE FROM weatherData WHERE id = $1';
  var weatherId = req.weatherData.id;
 // var weatherId = req.weatherData.id;
  console.log("Second weather Id is: " + weatherId);
  postgres.client.query(sql, [ weatherId ], function(err, result) {
    if (err) {
      console.error(err);
      return res.json({ errors: ['Could not delete weather]']});
    }
    console.log("The delete has been performed");
    res.json(result.rows);
  });
});

app.use('/weather', weatherRouter);

function getId(req, res, next) {
  var weatherId = req.params.id;
  console.log("Weather Id is: " + weatherId);
  var sql = 'SELECT * FROM weatherData WHERE id = $1';
  postgres.client.query(sql, [ weatherId ], function(err, result) {
    if (err) {
      console.error(err);
      return res.json({errors: ['Could not retrieve weatherData'] });
    }
    if (result.rows.length === 0) {
      return res.json({ errors: ['Weather data not found']});
    }
    req.weatherData = result.rows[0];
    next();
  });
}

module.exports = app;
