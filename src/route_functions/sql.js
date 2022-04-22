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

    let query = "";

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

        query = `SELECT * FROM image_HTML_URl WHERE id=?`;
        connection.query(query, params[1], function (err, result, fields) {
          if (err) {
            reject(err)
          }
          resolve(result);

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