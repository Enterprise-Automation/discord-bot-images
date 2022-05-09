const { remove } = require('../controllers/images.controller');

module.exports = async function (req, resolve, reject) {

   // req.get("user") != "EAS-rhysmorgan1986"
    if (req.headers.user != "EAS-Clark") {
        reject({"status_code": 400, "response": "Not authorised to delete images" });

    } else {

        console.log('id :' +req.headers.id)
        if (isNaN(req.headers.id)) {
            reject({ "status_code": 400, "response": "not a number " });
        }

        try {
            let rows = await remove(req.headers.id);

            console.log(rows.affectedRows);

            if (rows.affectedRows == 0){
                reject({"status_code": 400, "response": "No file to delete" });
            }
            resolve({"status_code": 202, "response": "Succesfully deleted image" });
        } catch (err) {
            reject({"status_code": 400, "response": "Fail to delete images" });
        }
    }
} 