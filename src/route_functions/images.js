const mysql = require('mysql');
const { getAll } = require('../controllers/images.controller')

const upload = require('../actionsUi/upload.js');
const get = require('../actionsUi/get.js');
const search = require('../actionsUi/search.js');
const tags = require('../actionsUi/tags.js');
const random = require('../actionsUi/random.js');
const deletefun = require('../actionsUi/delete.js');
const edit = require('../actionsUi/edit.js');
const stats = require('../actionsUi/stats.js');
const action = require('../actionsUi/action.js');


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'example',
    database: 'mysql'
});

connection.connect();

exports.get = async req => {

    return new Promise(async (resolve, reject) => {

        switch (req.headers.action) {

            case "get":

                get(req, resolve, reject)

                break;
            case "search":

                console.log('type: ' + req.headers.type);
                console.log('input: ' + req.headers.input);


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
            reject({ "status": "failed", "status_message": "sending back image", "ui_message": "missing params url" });

        }
        if (params['Name_of_image'] == null) {
            reject({ "status": "failed", "status_message": "sending back image", "ui_message": "missing params name" });

        }
        if (params['tag'] == null) {
            reject({ "status": "failed", "status_message": "sending back image", "ui_message": "missing params tag" });

        }

        query = `SELECT * FROM image_HTML_URl WHERE HTML_URL=?`;

        query(query, params['HTML_URL'], function (err, result, fields) {
            if (err) {
                reject(err)
            }
            try {
                reject({ "status": "failed", "status_message": "sending back image", "ui_message": "image already in saved" + "\nimage is saved as;\nid: " + result[0].id + " name: " + result[0].Name_of_image });
            } catch (error) {

                query = `SELECT * FROM image_HTML_URl WHERE Name_of_image=?`;

                connection.query(query, params['Name_of_image'], function (err, result, fields) {
                    if (err) {
                        reject(err)
                    }
                    try {
                        reject({ "status": "failed", "status_message": "sending back image", "ui_message": "image already in saved urnder that name" + "\nimage is saved as;\nid: " + result[0].id + " name: " + result[0].Name_of_image });
                    } catch (error) {

                        query = `INSERT INTO image_HTML_URl 
                  (HTML_URL, Name_of_image, tag) 
                  VALUES
                    (?, ?, ?)`;

                        connection.query(query, [params['HTML_URL'], params['Name_of_image'], params['tag']], function (err, result, fields) {
                            if (err) {
                                reject({ "status": "failed", "status_message": "can't resolve query", "ui_message": "Failed to upload image (Url could be to big)" })
                            }
                            resolve({ "status": "success", "status_message": "sending back image", "ui_message": "Upload image. id: " + result.insertId + " Name: " + params['Name_of_image'] });
                        });
                    }
                });
            }
        });

    });

}


