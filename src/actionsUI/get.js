const { getAll } = require('../controllers/images.controller');

module.exports = async function (req, resolve, reject) {

    let rows = await getAll();
    resolve(rows)

}
