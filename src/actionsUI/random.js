const { getAll, getByTagLike } = require('../controllers/images.controller');

let randomNumber;

module.exports = async function (req, resolve, reject) {


  console.log(params);
  if (params[2] == '*') {

    try {
      let rows = await getAll();
      randomNumber = getRandomInt(0, rows.length - 1);
      resolve({ "status": "success", "status_message": "sending back image", "discord_message": rows[randomNumber].HTML_URL });
    } catch (error) {
      reject({ "status": "failed", "status_message": "can't resolve query", "discord_message": "failed to find images with tags" });
    }


  } else {

    try {
      let rows = await getByTagLike(params[2]);
     
      randomNumber = getRandomInt(0, rows.length - 1);
  
      resolve({ "status": "success", "status_message": "sending back image", "discord_message": rows[randomNumber].HTML_URL });
    } catch (error) {
      reject({ "status": "failed", "status_message": "can't resolve query", "discord_message": "failed to find images with the tag of " + params[2] });
    }

  }

}


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}