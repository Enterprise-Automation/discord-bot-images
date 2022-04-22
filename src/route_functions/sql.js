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

    // test
    console.log("params 0 = " + params);

    let query = "";



    // Expected validation response on /api/validation/appname,command
    //{"status":"success","status_message":"valid_command"}

    // Expected successful command response on /api/command/appname,command
    //{"status": "success", "status_message": "insert status message here", "discord_message": "message for discord here"}

    switch (params[1]) {
      case "get":
        connection.query(`SELECT * FROM image_HTML_URl`, function (err, result, fields) {
          if (err) {
            reject(err)
          }
          //result
          console.log(result);
          resolve({"status": "success", "status_message": "sending back image", "discord_message":  + result[0].HTML_URL  });
        });
       

        break;
      case "getById":

        query = `SELECT * FROM image_HTML_URl WHERE id=?`;
        connection.query(query, params[2], function (err, result, fields) {
          if (err) {
            reject(err)
          }
        


          console.log(result[0].HTML_URL);
          resolve({"status": "success", "status_message": "sending back image", "discord_message": result[0].HTML_URL  });


        });
 

        break;
      case "getByName":

        query = `SELECT * FROM image_HTML_URl WHERE Name_of_image=?`;
        connection.query(query, params[1], function (err, result, fields) {
          if (err) {
            reject(err)
          }
          resolve(result);

        });

        break;
      case "upload":

        query = `INSERT INTO image_HTML_URl 
        (HTML_URL, Name_of_image, tag) 
        VALUES
          (?, ?, ?)`;

        connection.query(query, params, function (err, result, fields) {
          if (err) {
            reject(err)
          }
          resolve(result);
        });

        break;
      default:
      // code block
    }

    //connection.end();  ?? where do you go??


  });



}

/*

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

  delete: function (id, resolve, reject) {

  }

}
*/