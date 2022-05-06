const { getByID, getByNameLike, getByUrl } = require('../controllers/images.controller');

module.exports = async function (connection, params, resolve, reject) {

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

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }