require('dotenv').config()
const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const app = express();

const fs = require("fs");

const {connect: connectDB} = require('./utils/db')

connectDB()

app.use(express.static('public'));
app.use(express.text());
app.use(fileUpload());
app.use(express.raw({ type: 'image/*', limit: '5mb' }));

app.use(express.json())


fs.readdirSync(path.join(__dirname, "routes")).forEach(function(file) {
  if (file[0] === ".") {
    return;
  }
  require(path.join(__dirname, "routes", file))(app);
});

app.listen(8000, () => {
  console.log('listening on port 8000');
});

// docker run --name some-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=my-Renegade187! -e MYSQL_DATABASE=discord-bot-images -d mysql:5.7