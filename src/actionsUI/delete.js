const { remove } = require('../controllers/images.controller');

module.exports = async function (req, resolve, reject) {

   // req.get("user") != "EAS-rhysmorgan1986"
    if (req.headers.user != "EAS-Clark") {
        reject({"status_code": 401, "response": "Not authorised to delete images" });

    } else {

        try {
            await remove(req.headers.id);
            resolve({"status_code": 202, "response": "Succesfully deleted image" });
        } catch (err) {
            reject({"status_code": 406, "response": "Fail to delete images" });
        }
    }
} 