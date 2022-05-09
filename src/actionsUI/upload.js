const { getByUrl, getByName, create } = require('../controllers/images.controller');

module.exports = async function (req, resolve, reject) {


    if (req.body.HTML_URL == null) {
        reject({"status_code": 400, "response": "missing params url" });

    }
    if (req.body.Name_of_image == null) {
        reject({"status_code": 400, "response": "missing params name" });

    }
    if (req.body.tag == null) { 
        reject({"status_code": 400, "response": "missing params tag" });

    }


    try {
        let rows = await getByUrl(req.body.HTML_URL);
        reject({"status_code": 400, "response": "image already in saved" + "\nimage is saved as;\nid: " + rows.id + " name: " + rows.Name_of_image });
    } catch (err) {

        try {
            let rows = await getByName(req.body.Name_of_image );
            reject({  "status_code": 400, "response": "image already in saved" + "\nimage is saved as;\nid: " + rows.id + " name: " + rows.Name_of_image });
        } catch (err) {

            try {

                let rows = await create(req.body.HTML_URL, req.body.Name_of_image , req.body.tag);
                console.log(rows);
                resolve({"status_code": 200, "response": "Upload image. id: " + rows.insertId + " Name: " + req.body.Name_of_image});
            } catch (err) {
                reject({  "status_code": 400, "response": "Failed to upload image (Url could be to big)" })
            }
        }
    }
}

