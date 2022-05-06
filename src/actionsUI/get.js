const { getAll } = require('../controllers/images.controller');

module.exports = async function (req, resolve, reject) {

    let rows = await getAll();
    resolve({"status_code": 200, "response": rows})

}
