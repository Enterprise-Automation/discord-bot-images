const {getAll} = require('../controllers/images.controller');

module.exports = async function (connection, params, resolve, reject) {
    try {
        let rows = await getAll();
        resolve({ "status": "success", "status_message": "sending back image", "discord_message": + rows[0].HTML_URL });
    } catch(err) {
        reject(err);
    }
}
