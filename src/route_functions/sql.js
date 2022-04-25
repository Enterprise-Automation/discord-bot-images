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
          resolve({ "status": "success", "status_message": "sending back image", "discord_message": + result[0].HTML_URL });
        });


        break;
      case "getById":

        query = `SELECT * FROM image_HTML_URl WHERE id=?`;
        connection.query(query, params[2], function (err, result, fields) {
          if (err) {
            reject(err)
          }



          console.log(result[0].HTML_URL);
          resolve({ "status": "success", "status_message": "sending back image", "discord_message": result[0].HTML_URL });


        });


        break;
      case "getByName":

        query = `SELECT * FROM image_HTML_URl WHERE Name_of_image=?`;
        connection.query(query, params[2], function (err, result, fields) {
          if (err) {
            reject(err)
          }

          resolve({ "status": "success", "status_message": "sending back image", "discord_message": result[0].HTML_URL });

        });

        break;
      case "upload":

        console.log("params: " + params);

        query = `INSERT INTO image_HTML_URl 
        (HTML_URL, Name_of_image, tag) 
        VALUES
          (?, ?, ?)`;

        connection.query(query, [params[2], params[3], params[4]], function (err, result, fields) {
          if (err) {
            reject(err)
          }
          resolve({ "status": "success", "status_message": "sending back image", "discord_message": "upload" });
        });

        break;
      case "random":

        query = `SELECT * FROM image_HTML_URl WHERE tag =?`

        connection.query(query, params[2], function (err, result, fields) {
          if (err) {
            reject(err)
          }

          resolve({ "status": "success", "status_message": "sending back image", "discord_message": result[getRandomInt(0,result.length)].HTML_URL });

        });

    }

 


  });

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

}
