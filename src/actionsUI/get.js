const { getAll } = require('../controllers/images.controller');

module.exports = async function (req, resolve, reject) {

    try{

        let rows = await getAll();
        resolve({"status_code": 200, "response": rows})
    } catch (err) {
        reject(err)
    }

}
