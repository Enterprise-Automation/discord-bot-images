const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const app = express();

app.use(fileUpload());

app.get('/', (req, res) => {
  res.send('Hello from my app');
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});