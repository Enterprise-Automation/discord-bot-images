const Promise = require('promise');
const mysql = require('mysql');


var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'example',
  database: 'mysql'
});

connection.connect();


exports.func = req => {
  return new Promise((resolve, reject) => {

    let params = req.params.command.split(",");
    let query = "";
    // test

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
      case "search":

        if (params[2].toLowerCase() === "id") {
          query = `SELECT * FROM image_HTML_URl WHERE id=?`;
          connection.query(query, params[3], function (err, result, fields) {
            if (err) {
              reject(err)
            }
            try {
              resolve({ "status": "success", "status_message": "sending back image", "discord_message": result[0].HTML_URL });
            } catch (error) {
              reject({ "status": "failed", "status_message": "can't resolve query", "discord_message": "Can't find a image with the id of " + params[3] });
            }

          });

        } else if (params[2].toLowerCase() === "name") {

          query = `SELECT * FROM image_HTML_URl WHERE Name_of_image=?`;
          connection.query(query, params[3], function (err, result, fields) {
            if (err) {
              reject(err)
            }
            try {
              resolve({ "status": "success", "status_message": "sending back image", "discord_message": result[0].HTML_URL });
            } catch (error) {
              reject({ "status": "failed", "status_message": "can't resolve query", "discord_message": "Can't find a image with the name of " + params[3] });
            }
          });

        } else if (params[2].toLowerCase() === "url") {

          query = `SELECT * FROM image_HTML_URl WHERE HTML_URL=?`;
          connection.query(query, params[3], function (err, result, fields) {
            if (err) {
              reject(err)
            }
            try {
              resolve({ "status": "success", "status_message": "sending back image", "discord_message": "image is saved as;\nid: " + result[0].id + " name: " + result[0].Name_of_image });
            } catch (error) {
              reject({ "status": "failed", "status_message": "can't resolve query", "discord_message": "Can't find a image with that url" });
            }
          });

        } else {
          reject({ "status": "failed", "status_message": "can't resolve query", "discord_message": "invaled commmand:\nsearch name image_name\nsearch url image_url\nsearch id image_id" });

        }


        break;
      case "upload":

        query = `SELECT * FROM image_HTML_URl WHERE HTML_URL=?`;

        connection.query(query, params[2], function (err, result, fields) {
          if (err) {
            reject(err)
          }
          try {
            resolve({ "status": "failed", "status_message": "sending back image", "discord_message": "image already in saved" + "\nimage is saved as;\nid: " + result[0].id + " name: " + result[0].Name_of_image });
          } catch (error) {

            query = `SELECT * FROM image_HTML_URl WHERE Name_of_image=?`;

            connection.query(query, params[3], function (err, result, fields) {
              if (err) {
                reject(err)
              }
              try {
                resolve({ "status": "failed", "status_message": "sending back image", "discord_message": "image already in saved urnder that name" + "\nimage is saved as;\nid: " + result[0].id + " name: " + result[0].Name_of_image });
              } catch (error) {

                query = `INSERT INTO image_HTML_URl 
                (HTML_URL, Name_of_image, tag) 
                VALUES
                  (?, ?, ?)`;
  
              connection.query(query, [params[2], params[3], params[4]], function (err, result, fields) {
                if (err) {
                  reject({ "status": "failed", "status_message": "can't resolve query", "discord_message": "Failed to upload image (Url could be to big)" })
                }
                resolve({ "status": "success", "status_message": "sending back image", "discord_message": "Upload image. id: " + result.insertId + " Name: " + params[3] });
              });
              }});
            


          }
        });



        break;
      case "tags":

        query = `SELECT tag, count(*) FROM image_HTML_URl GROUP BY tag`

        connection.query(query, params[2], function (err, result, fields) {

          reject({ "status": "failed", "status_message": "can't resolve query", "discord_message": "Lit of tags: \n" + arrayToString(result) });
        });

        break;
      case "random":

        query = `SELECT * FROM image_HTML_URl WHERE tag=?`

        connection.query(query, params[2], function (err, result, fields) {
          if (err) {
            reject({ "status": "failed", "status_message": "can't resolve query", "discord_message": "failed to find images with the tag of " + params[2] + "\ntry the command !image tags" });
          }

          let randomNumber = getRandomInt(0, result.length - 1);

          try {
            resolve({ "status": "success", "status_message": "sending back image", "discord_message": result[randomNumber].HTML_URL });
          } catch (error) {
            reject({ "status": "failed", "status_message": "can't resolve query", "discord_message": "failed to find images with the tag of " + params[2] });
          }


        });

        break;
      case "delete":

        if (req.get("user") != "EAS-Clark") {
          resolve({ "status": "Fail", "status_message": "Not Authorised", "discord_message": "Not authorised to delete images" });

        } else {
          query = `DELETE FROM image_HTML_URl WHERE id=?`

          connection.query(query, params[2], function (err, result, fields) {
            if (err) {
              console.log(err)
              resolve({ "status": "Fail", "status_message": "Edit deleted", "discord_message": "Fail to delete images" });
            }
            resolve({ "status": "success", "status_message": "Image deleted", "discord_message": "Succesfully deleted image" });
          });
        }
        break;
      case "edit":

        if (req.get("user") != "EAS-Clark") {
          resolve({ "status": "Fail", "status_message": "Not Authorised", "discord_message": "Not authorised to edit images" });

        } else {
          query = `UPDATE image_HTML_URl
            SET Name_of_image=?, tag=?
            WHERE id=?`

          connection.query(query, [params[3], params[4], params[2]], function (err, result, fields) {

            if (err) {

              resolve({ "status": "Fail", "status_message": "Edit Fail", "discord_message": "Edit images data" });
            } else {
              resolve({ "status": "success", "status_message": "Image Edited", "discord_message": "Succesfully edited image data" });
            }


          });
        }

    }

  });

  function arrayToString(array) {

    let stringArry = "Tag: name - number of tag\n---------------------------\n";

    for (let i = 0; i <= array.length - 1; i++) {
      stringArry = stringArry + "Tag: " + array[i]["tag"] + " - " + array[i]["count(*)"] + "\n"
    }

    return stringArry;
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
