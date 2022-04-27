const Promise = require('promise');
const mysql = require('mysql');
const upload = require('../actions/upload.js');
const get = require('../actions/get.js');
const search = require('../actions/search.js');
const tags = require('../actions/tags.js');
const random = require('../actions/random.js');
const deletefun = require('../actions/delete.js');
const edit = require('../actions/upload.js');

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

    // test

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

    }

  });

  function arrayToString(array) {

    let stringArry = "Tag: name - number of tag\n---------------------------\n";

    for (let i = 0; i <= array.length - 1; i++) {
      stringArry = stringArry + "Tag: " + array[i]["tag"] + " - " + array[i]["count(*)"] + "\n"
    }

    return stringArry;
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
