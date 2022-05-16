const upload = require('../actionsUI/upload.js');
const get = require('../actionsUI/get.js');
const search = require('../actionsUI/search.js');
const tags = require('../actionsUI/tags.js');
const random = require('../actionsUI/random.js');
const deletefun = require('../actionsUI/delete.js');
const edit = require('../actionsUI/edit.js');
const stats = require('../actionsUI/stats.js');
const action = require('../actionsUI/action.js');


exports.get = async req => {

    console.log('hello');
    console.log(req.headers.action);

    return new Promise(async (resolve, reject) => {

        switch (req.headers.action) {

            case "get":

                get(req, resolve, reject)

                break;
            case "search":

                search(req, resolve, reject);

                break;
            case "tags":

                tags(req, resolve, reject);

                break;
            case "random":

                random(req, resolve, reject);

                break;
            case "delete":

                deletefun(req, resolve, reject);

                break;
            case "edit":

                edit(req, resolve, reject);

                break;
            case "stats":

                stats(req, resolve, reject);

                break;
            case "action":

                action(req, resolve, reject);

        }
    });
}

exports.post = req => {

    return new Promise((resolve, reject) => {

        upload(req, resolve, reject);

    });

}


