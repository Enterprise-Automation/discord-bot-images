
const express = require('express');
const fileUpload = require('express-fileupload');
let sql = require('./sql.js')
const path = require('path');
const app = express();
const function_module = require('../route_functions/validate.js');
const fs = require("fs");


app.use(express.static('public'));
app.use(express.text());
app.use(fileUpload());
app.use(express.raw({ type: 'image/*', limit: '5mb' }));

let router = express.Router();



fs.readdirSync(path.join(__dirname, "routes")).forEach(function(file) {
  if (file[0] === ".") {
    return;
  }
  require(path.join(__dirname, "routes", file))(app);
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
