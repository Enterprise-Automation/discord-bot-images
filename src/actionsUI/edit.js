const { update, getByName } = require('../controllers/images.controller');


module.exports = async function (req, resolve, reject) {

    console.log('hello there');
    console.log(req.headers.id);
    console.log(req.headers.name);
    console.log(req.headers.tag);

    if (req.headers.user != "EAS-Clark") {
        resolve({"status_code": 400, "response": "Not authorised to edit images" });
 
    } else {

        try {

            let rows = await getByName(req.headers.name);
            if (rows.Name_of_image == req.headers.name) {
                reject({"status_code": 400, "response": "Can't edit images data (File with same name)" });
            }
 

        } catch (err) {

            try {
                //(id, name, tag) 
                let result = await update(req.headers.id, req.headers.name , req.headers.tag);
                console.log(result)
                if (result.affectedRows == 1){
                    resolve({"status_code": 200, "response": "Succesfully edited image data" });
                }else{
                    
                    reject({"status_code": 400, "response": "No file to edited" });
                }
                
            } catch (err) {
                reject({"status_code": 400, "response": "Can't edit images data" });
            }

        }

    }
} 