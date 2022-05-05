const { getByID, getByNameLike, getByUrl } = require('../controllers/images.controller');

module.exports = async function (connection, params, resolve, reject) {

    if (params[2].toLowerCase() === "id") {

        try {
            let row = await getByID(params[3]);
            resolve({ "status": "success", "status_message": "sending back image", "discord_message": + row[0].HTML_URL });
        } catch (err) {
            reject({ "status": "failed", "status_message": "can't resolve query", "discord_message": "Can't find a image with the id of " + params[3] });
        }


    } else if (params[2].toLowerCase() === "name") {

        try {
            let row = await getByNameLike(params[3]);
            resolve({ "status": "success", "status_message": "sending back image", "discord_message": + row[0].HTML_URL });
        } catch (err) {
            reject({ "status": "failed", "status_message": "can't resolve query", "discord_message": "Can't find a image with the name of " + params[3] });
        }


    } else if (params[2].toLowerCase() === "url") {

        try {
            let row = await getByUrl(params[3]);
            resolve({ "status": "success", "status_message": "sending back image", "discord_message": "image is saved as;\nid: " + row[0].id + " name: " + row[0].Name_of_image });
        } catch (err) {
            reject({ "status": "failed", "status_message": "can't resolve query", "discord_message": "Can't find a image with that url" });
        }


    } else {
        reject({ "status": "failed", "status_message": "can't resolve query", "discord_message": "invaled commmand:\nsearch name image_name\nsearch url image_url\nsearch id image_id" });

    }

}