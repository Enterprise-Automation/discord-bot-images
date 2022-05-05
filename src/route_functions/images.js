const mysql = require('mysql');
const {getAll} = require('../controllers/images.controller')


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'example',
    database: 'mysql'
});

connection.connect();

exports.get = req => {
    return new Promise(async (resolve, reject) => {
        let rows = await getAll()
        resolve(rows)
    });
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


