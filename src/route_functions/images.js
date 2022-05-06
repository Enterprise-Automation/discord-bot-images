const mysql = require('mysql');
const { getAll } = require('../controllers/images.controller')


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'example',
    database: 'mysql'
});

connection.connect();

exports.get = async req => {

    switch (req.headers.action) {

        case "get":

            return new Promise(async (resolve, reject) => {
                let rows = await getAll()
                resolve(rows)
            });
  
            break;
        case "search":

            if (params[2].toLowerCase() === "id") {

                try {
                    let row = await getByID(params[3]);
                   
                    resolve({ "status": "success", "status_message": "sending back image", "discord_message": '' + row.HTML_URL });
                } catch (err) {
                    reject({ "status": "failed", "status_message": "can't resolve query", "discord_message": "Can't find a image with the id of " + params[3] });
                }
        
        
            } else if (params[2].toLowerCase() === "name") {
        
                try {
             
                    let rows = await getByNameLike(params[3]);
        
                    randomInt = getRandomInt(0, rows.length -1 );
        
                    resolve({ "status": "success", "status_message": "sending back image", "discord_message": '' + rows[randomInt].HTML_URL });
        
                } catch (err) {
                    reject({ "status": "failed", "status_message": "can't resolve query", "discord_message": "Can't find a image with the name of " + params[3] });
                }
        
        
            } else if (params[2].toLowerCase() === "url") {
        
                try {
                    let row = await getByUrl(params[3]);
                    resolve({ "status": "success", "status_message": "sending back image", "discord_message": "image is saved as;\nid: " + row.id + " name: " + row.Name_of_image });
                } catch (err) {
                    reject({ "status": "failed", "status_message": "can't resolve query", "discord_message": "Can't find a image with that url" });
                }
        
        
            } else {
                reject({ "status": "failed", "status_message": "can't resolve query", "discord_message": "invaled commmand:\nsearch name image_name\nsearch url image_url\nsearch id image_id" });
        
            }


            break;
        case "upload":



            break;
        case "tags":



            break;
        case "random":



            break;
        case "delete":



            break;
        case "edit":



            break;
        case "stats":



            break;
        case "actions":


    }

}

exports.post = req => {

    return new Promise((resolve, reject) => {

        console.log(req.body);
        params = req.body;
        console.log(params['HTML_URL']);
        console.log(params['Name_of_image']);
        console.log(params['tag']);

        if (params['HTML_URL'] == null) {
            reject({ "status": "failed", "status_message": "sending back image", "discord_message": "missing params url" });

        }
        if (params['Name_of_image'] == null) {
            reject({ "status": "failed", "status_message": "sending back image", "discord_message": "missing params name" });

        }
        if (params['tag'] == null) {
            reject({ "status": "failed", "status_message": "sending back image", "discord_message": "missing params tag" });

        }

        query = `SELECT * FROM image_HTML_URl WHERE HTML_URL=?`;

        query(query, params['HTML_URL'], function (err, result, fields) {
            if (err) {
                reject(err)
            }
            try {
                reject({ "status": "failed", "status_message": "sending back image", "discord_message": "image already in saved" + "\nimage is saved as;\nid: " + result[0].id + " name: " + result[0].Name_of_image });
            } catch (error) {

                query = `SELECT * FROM image_HTML_URl WHERE Name_of_image=?`;

                connection.query(query, params['Name_of_image'], function (err, result, fields) {
                    if (err) {
                        reject(err)
                    }
                    try {
                        reject({ "status": "failed", "status_message": "sending back image", "discord_message": "image already in saved urnder that name" + "\nimage is saved as;\nid: " + result[0].id + " name: " + result[0].Name_of_image });
                    } catch (error) {

                        query = `INSERT INTO image_HTML_URl 
                  (HTML_URL, Name_of_image, tag) 
                  VALUES
                    (?, ?, ?)`;

                        connection.query(query, [params['HTML_URL'], params['Name_of_image'], params['tag']], function (err, result, fields) {
                            if (err) {
                                reject({ "status": "failed", "status_message": "can't resolve query", "discord_message": "Failed to upload image (Url could be to big)" })
                            }
                            resolve({ "status": "success", "status_message": "sending back image", "discord_message": "Upload image. id: " + result.insertId + " Name: " + params['Name_of_image'] });
                        });
                    }
                });
            }
        });

    });

}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }