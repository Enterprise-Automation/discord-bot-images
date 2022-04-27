

module.exports = function (connection, params) {

    return new Promise((resolve, reject) => {

        query = `SELECT tag, count(*) FROM image_HTML_URl GROUP BY tag`

        connection.query(query, params[2], function (err, result, fields) {

            reject({ "status": "failed", "status_message": "can't resolve query", "discord_message": "Lit of tags: \n" + arrayToString(result) });
        });




    });

}