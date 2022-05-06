const { getAll, getByTagLike } = require('../controllers/images.controller');

let randomNumber;

module.exports = async function (req, resolve, reject) {



  console.log(params);
  if (req.headers.input == '*') {

    try {
      let rows = await getAll();
      randomNumber = getRandomInt(0, rows.length - 1);
      resolve({   "status_code": 200, "response": '' +  rows[randomNumber].HTML_URL });
    } catch (error) {
      reject({  "status_code": 404, "response": "failed to find images with tags" });
    }


  } else {

    try {
      let rows = await getByTagLike(req.headers.input);
     
      randomNumber = getRandomInt(0, rows.length - 1);
  
      resolve({   "status_code": 200, "response": '' + rows[randomNumber].HTML_URL });
    } catch (error) {
      reject({  "status_code": 404, "response": "failed to find images with the tag of " + req.headers.input });
    }

  }

}


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}