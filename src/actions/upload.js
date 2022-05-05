const { getByUrl, getByName, create } = require('../controllers/images.controller');

module.exports = async function (connection, params, resolve, reject) {


    console.log('params[2] url ' + params[2]);
    console.log('params[3] name ' + params[3]);
    console.log('params[4] tag ' + params[4]);

    if (params[2] == null) {
        reject({ "status": "failed", "status_message": "sending back image", "discord_message": "missing params url" });

    }
    if (params[3] == null) {
        reject({ "status": "failed", "status_message": "sending back image", "discord_message": "missing params name" });

    }
    if (params[4] == null) {
        reject({ "status": "failed", "status_message": "sending back image", "discord_message": "missing params tag" });

    }


    try {
        let rows = await getByUrl(params[2]);
        reject({ "status": "failed", "status_message": "sending back image", "discord_message": "image already in saved" + "\nimage is saved as;\nid: " + rows.id + " name: " + rows.Name_of_image });
    } catch (err) {

        try {
            let rows = await getByName(params[3]);
            reject({ "status": "failed", "status_message": "sending back image", "discord_message": "image already in saved" + "\nimage is saved as;\nid: " + rows.id + " name: " + rows.Name_of_image });
        } catch (err) {

            try {

                let rows = await create(params[2], params[3], params[4]);
                console.log(rows);
                resolve({ "status": "success", "status_message": "sending back image", "discord_message": "Upload image. id: " + rows.insertId + " Name: " + params[3] });
            } catch (err) {
                reject({ "status": "failed", "status_message": "can't resolve query", "discord_message": "Failed to upload image (Url could be to big)" })
            }
        }
    }
}