const { update } = require('../controllers/images.controller');


module.exports = function (connection, params, resolve, reject) {


    if (req.get("user") != "EAS-Clark" ) {
        resolve({ "status": "Fail", "status_message": "Not Authorised", "discord_message": "Not authorised to edit images" });

    } else {

        try {
            //(id, name, tag) 
            let rows = await update(params[2], params[3], params[4]);
            resolve({ "status": "success", "status_message": "Image Edited", "discord_message": "Succesfully edited image data" });
        } catch (err) {
            reject({ "status": "Fail", "status_message": "Edit Fail", "discord_message": "Edit images data" });
        }

    }



}