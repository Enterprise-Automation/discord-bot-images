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

        connection.query(`SELECT * FROM image_HTML_URl`, function (err, result, fields) {
            if (err) {
                reject(err)
            }
            console.log(result);
            resolve(result );
        });



    });

}