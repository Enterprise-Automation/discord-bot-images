const { getByID, getByNameLike, getByUrl } = require('../controllers/images.controller');

module.exports = async function (req, resolve, reject) {


    console.log('type: ' + req.headers.type);
    console.log('input: ' + req.headers.input);

    if (req.headers.type.toLowerCase() === "id") {

        try {
            let row = await getByID(req.headers.input);
           
            resolve({"status_code": 200, "response": '' + row.HTML_URL});
        } catch (err) {
            reject({"status_code": 400, "response": "Can't find a image with the id of " + req.headers.input });
        }


    } else if (req.headers.type.toLowerCase() === "name") {

        try {
     
            let rows = await getByNameLike(req.headers.input);

            randomInt = getRandomInt(0, rows.length -1 );

            resolve({"status_code": 200, "response": '' + rows[randomInt].HTML_URL });

        } catch (err) {
            reject({"status_code": 400, "response": "Can't find a image with the name of " + req.headers.input });
        }


    } else if (req.headers.type.toLowerCase() === "url") {

        try {
            let row = await getByUrl(req.headers.input);
            resolve({"status_code": 200, "response": "image is saved as;\nid: " + row.id + " name: " + row.Name_of_image });
        } catch (err) {
            reject({"status_code": 400, "response": "Can't find a image with that url" });
        }


    } else {
        reject({"status_code": 400, "response": "invaled commmand:\nsearch name image_name\nsearch url image_url\nsearch id image_id" });

    }

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }