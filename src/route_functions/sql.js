const Promise = require('promise');
const mysql = require('mysql');
const upload = require('../actionsDiscord/upload.js');
const get = require('../actionsDiscord/get.js');
const search = require('../actionsDiscord/search.js');
const tags = require('../actionsDiscord/tags.js');
const random = require('../actionsDiscord/random.js');
const deletefun = require('../actionsDiscord/delete.js');
const edit = require('../actionsDiscord/edit.js');
const stats = require('../actionsDiscord/stats.js');
const action = require('../actionsDiscord/action.js');


var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'example',
  database: 'mysql'
});

connection.connect();

// http://vcenter.easlab.co.uk

exports.func = req => {
  return new Promise((resolve, reject) => {

    let params = req.params.command.split(",");
  

    switch (params[1]) {
      case "get":

        get(connection, params, resolve, reject);

        break;
      case "search":

        search(connection, params, resolve, reject);

        break;
      case "upload":

        upload(connection, params, resolve, reject);

        break;
      case "tags":

        tags(connection, params, resolve, reject);

        break;
      case "random":

        random(connection, params, resolve, reject);

        break;
      case "delete":

        deletefun(connection, params, resolve, reject);
        
        break;
      case "edit":

        edit(connection, params, resolve, reject);

        break;
      case "stats":

        stats(connection, params, resolve, reject);

        break;
      case "actions":

        action(connection, params, resolve, reject);

    }

  });

}
