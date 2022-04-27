

module.exports = function (connection, params) {

    return new Promise((resolve, reject) => {

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


    });

}