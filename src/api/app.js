
const express = require('express');
const fileUpload = require('express-fileupload');
let sql = require('./sql.js')
const path = require('path');
const app = express();
const function_module = require('../route_functions/validate.js');


app.use(express.static('public'));
app.use(express.text());
app.use(fileUpload());
app.use(express.raw({ type: 'image/*', limit: '5mb' }));

let router = express.Router();

var string = 'http://localhost:3000/image/upload/https://cdn.discordapp.com/attachments/597445991699841056/965911868197703700/IMG_2164.PNG';

// Encode the String
var encodedString = btoa(string);
console.log(encodedString); // Outputs: "SGVsbG8gV29ybGQh"

// Decode the String
var decodedString = atob(encodedString);
console.log(decodedString);


app.use('/image/', router);

// validate a command 
router.get('/validate/:command', function(req, res, next) {
  var getResponse = function_module.func(req);
  getResponse.then((response) => {
    res.send(response);
  }).catch(err => {
    res.send(err);
  });
});


// get all links 
/*
router.get('/', function (req, res, next) {
  sql.get(function (data) {
    res.status(200).json({
      'status': 200,
      'statusText': 'OK',
      'message': 'All facts retrieved',
      'data': data
    });
  },
    function (err) {
      next(err);
    });
});
*/

// search by id 
router.get('/id/:id', function (req, res, next) {
  sql.getById(req.params.id, function (data) {
    if (data) {
      res.status(200).json({
        'status': 200,
        'statusText': 'OK',
        'message': 'All images retrieved',
        'data': data
      });
    } else {
      res.status(404).json({
        'status': 404,
        'statusText': 'Not found',
        'message': `Image: '${req.params.id}' not be found.`,
        'error': {
          "code": "NOT_FOUND",
          "message": `Image: '${req.params.id}' not be found.`
        }
      });
    }
  }, function (err) {
    next(err);
  });
});

// search by name 
router.get('/name/:name', function (req, res, next) {
  sql.getByName(req.params.name, function (data) {
    if (data) {
      res.status(200).json({
        'status': 200,
        'statusText': 'OK',
        'message': 'All images retrieved',
        'data': data
      });
    } else {
      res.status(404).json({
        'status': 404,
        'statusText': 'Not found',
        'message': `Image: '${req.params.name}' not be found.`,
        'error': {
          "code": "NOT_FOUND",
          "message": `Image: '${req.params.name}' not be found.`
        }
      });
    }
  }, function (err) {
    next(err);
  });
});

// upload a image  
// expected input http://localhost:3000/image/upload/https://cdn.discordapp.com/attachments/597445991699841056/965911868197703700/IMG_2164.PNG
router.get('/upload/:imageData', function (req, res, next) {
  sql.insert(req.params.imageData, function (data) {
    if (data) {
      res.status(201).json({
        'status': 201,
        'statusText': 'Created',
        'message': 'image path upload',
        'data': data
      });
    } else {
      res.status(400).json({
        'status': 400,
        'statusText': 'Bad Request',
        'message': `Image: '${req.params.imageData}' was unable to be uploaded.`,
        'error': {
          "code": "Bad Request",
          "message": `Image: '${req.params.imageData}' was unable to be uploaded.`
        }
      });
    }
  }, function (err) {
    next(err);
  });
});

// look up a random image
router.get('/random/:tag', function (req, res, next) {
  sql.getRandom(function (data) {
      if (data) {
          res.status(200).json({
              "status": 200,
              "statusText": "ok",
              "message": "Random quote retrieved",
              "data": data
          });
      }
      else {
          res.status(404).json({
              "status": 404,
              "statusText": "Not Found",
              "message": "Random image not found.",
              "error": {
                  "code": "NOT_FOUND",
                  "message": "Random image not found."
              }
          });
      }
  }, function (err) {
      next(err);
  });
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
