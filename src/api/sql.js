
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



let sqlFuncation = {
  get: function (resolve, reject) {

    connection.query(`SELECT * FROM image_HTML_URl`, function (err, result, fields) {
      if (err) {
        reject(err)
      }
      resolve(result);
    });

  },
  getById: function (id, resolve, reject) {

    connection.query(`SELECT * FROM image_HTML_URl WHERE id=${id}`, function (err, result, fields) {
      if (err) {
        reject(err)
      }
      resolve(result);

    });

  },
  getByName: function (name, resolve, reject) {

    connection.query(`SELECT * FROM image_HTML_URl WHERE Name_of_image="${name}"`, function (err, result, fields) {
      if (err) {
        reject(err)
      }
      resolve(result);
    });

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

    */
  },

  delete: function (id, resolve, reject) {

  }

}

// connection end ??
module.exports = sqlFuncation