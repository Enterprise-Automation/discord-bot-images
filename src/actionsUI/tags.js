const { countTags } = require('../controllers/images.controller');

module.exports = async function (req, resolve, reject) {

  try {
    let rows = await countTags();
    resolve({"status_code": 200, "response": arrayToString(rows)});
  } catch (err) {
    reject(err);
  }

}

function arrayToString(array) {

  let stringArry = "";

  for (let i = 0; i <= array.length - 1; i++) {
    stringArry = stringArry + "Tag: " + array[i]["tag"] + " - " + array[i]["count(*)"] + "\n"
  }

  return stringArry;
}