const { update, getByName } = require('../controllers/images.controller');


module.exports = async function (req, resolve, reject) {
    console.log('hello there');

    if (req.headers.user != "EAS-Clark") {
        resolve({"status_code": 401, "response": "Not authorised to edit images" });

    } else {

        try {

            let rows = await getByName(req.headers.name);
            if (rows.Name_of_image == req.headers.name) {
                reject({"status_code": 406, "response": "Can't edit images data (File with same name)" });
            }


        } catch (err) {

            try {
                //(id, name, tag) 
                await update(req.headers.id, req.headers.name , req.headers.tag);

                resolve({"status_code": 200, "response": "Succesfully edited image data" });
            } catch (err) {
                reject({"status_code": 406, "response": "Can't edit images data" });
            }

        }

    }
} 