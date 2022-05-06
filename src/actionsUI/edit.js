const { update, getByName } = require('../controllers/images.controller');


module.exports = async function (req, resolve, reject) {
    console.log('hello there ');

    if (req.get("user") != "EAS-Clark") {
        resolve({ "status": "Fail", "status_message": "Not Authorised", "discord_message": "Not authorised to edit images" });

    } else {

        try {

            let rows = await getByName(params[3]);
            if (rows.Name_of_image == params[3]) {
                reject({ "status": "Fail", "status_message": "Edit Fail", "discord_message": "can't edit images data (File with same name)" });
            }


        } catch (err) {

            try {
                //(id, name, tag) 
                let rows = await update(params[2], params[3], params[4]);


                resolve({ "status": "success", "status_message": "Image Edited", "discord_message": "Succesfully edited image data" });
            } catch (err) {
                reject({ "status": "Fail", "status_message": "Edit Fail", "discord_message": "can't edit images data" });
            }

        }

    }
} 