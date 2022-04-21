/**
 * @openapi
 * /api/validate/{command}:
 *  get:
 *    description: Validate the bot command being used with this API
 *    produces:
 *     - application/json
 *    parameters:
 *     - name: command
 *       in: path
 *       required: true
 *       type: string    
 *    responses:
 *       200:
 *         description: Returns JSON document with validation results
 */

 let sql = require('../route_functions/sql.js');

 module.exports = function (app) {
     
     //get all
   app.get('/api/image/:command', (req, res, next) => {
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
   //get by id 
   app.get('/api/image/id/:id', function (req, res, next) {
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

  // get by name
  app.get('/api/image/name/:name', function (req, res, next) {
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
// expected input http://localhost:3000/image/upload/aHR0cDovL2xvY2FsaG9zdDozMDAwL2ltYWdlL3VwbG9hZC9odHRwczovL2Nkbi5kaXNjb3JkYXBwLmNvbS9hdHRhY2htZW50cy81OTc0NDU5OTE2OTk4NDEwNTYvOTY1OTExODY4MTk3NzAzNzAwL0lNR18yMTY0LlBORw==
app.get('/api/image/upload/:imageData', function (req, res, next) {
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
  app.get('/api/image/random/:tag', function (req, res, next) {
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

 }
 


/*
posablle need to use 
var string = 'http://localhost:3000/image/upload/https://cdn.discordapp.com/attachments/597445991699841056/965911868197703700/IMG_2164.PNG';
var b = new Buffer(string);
var s = b.toString('base64');
console.log(s);


var b = new Buffer(s, 'base64')
var c = b.toString();
console.log(c);

// Decode the String
*/




// search by name 



 