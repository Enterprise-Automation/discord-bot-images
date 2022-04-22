const Promise = require('promise');
const mysql = require('mysql');


var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'example',
  database: 'mysql'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});





exports.func = req => {
  return new Promise((resolve, reject) => {

    let params = req.params.command.split(",");


    console.log("params 0 = " + params);

    

    switch (params[0]) {
      case "get":
        connection.query(`SELECT * FROM image_HTML_URl`, function (err, result, fields) {
          if (err) {
            reject(err)
          }
          resolve(result);
        });
        break;
      case "getById":


        const { userinput } = id;
        const query = `SELECT * FROM image_HTML_URl WHERE id=?`;
        connection.query(query, [userinput], function (err, result, fields) {
          if (err) {
            reject(err)
          }
          resolve(result);

        });

        break;
      case "getByName":

       
        break;
      default:
      // code block
    }


  });
}

/*

  getById: function (id, resolve, reject) {

   
  },
  getByName: function (name, resolve, reject) {



  },
  insert: function (imageData, resolve, reject) {

    // imageData = 'Billy_puppy+PNG+Billy_puppy+dog'
    console.log(imageData);
    const myArray = imageData.split(",");
   

    connection.query(`INSERT INTO image_HTML_URl 
    (HTML_URL, Name_of_image, tag) 
    VALUES
      ('/uploads/${myArray[0]}.${myArray[1]}', '${myArray[2]}', '${myArray[3]}')`, function (err, result, fields) {
      if (err) {
        reject(err)
      }
      resolve(result);
    });


  },
  getRandom: function (resolve, reject) {

    // let arrr = Math.floor(Math.random() * (2 - 1 + 1) + min);

  
    // SELECT COUNT(id) FROM image_HTML_URl
    let r = connection.query(`SELECT COUNT(id) FROM image_HTML_URl`, function (err, result, fields) {
      console.log("hello "+ result)
      return 1;
    });
    console.log("hello "+ r)
    
    //let vc = getRandomArbitrary(1, r);
    //console.log("here i am ---------------" + r + "---" + vc)

    
  /*    
  connection.query(`SELECT * FROM image_HTML_URl WHERE id=${vc}`, function (err, result, fields) {
      if (err) {
        reject(err)
      }
      resolve(result);

    });

    
  },

  delete: function (id, resolve, reject) {

  }

}

// connection end ??
module.exports = sqlFuncation

/*

   app.get('/api/command/:command', (req, res, next) => {
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
   app.get('/api/image/id,:id', function (req, res, next) {
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
  app.get('/api/image/name,:name', function (req, res, next) {
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

  */