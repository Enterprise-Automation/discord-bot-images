const { remove } = require('../controllers/images.controller');
let query = "";
module.exports = async function (connection, params, resolve, reject) {

    req.get("user") != "EAS-rhysmorgan1986"
    if (req.get("user") != "EAS-Clark") {
        resolve({ "status": "Fail", "status_message": "Not Authorised", "discord_message": "Not authorised to delete images" });

    } else {

        try {
            let rows = await remove(params[2]);
            resolve({ "status": "success", "status_message": "Image deleted", "discord_message": "Succesfully deleted image" });
        } catch (err) {
            reject({ "status": "Fail", "status_message": "Fail to deleted", "discord_message": "Fail to delete images" });
        }
    }
} 