
const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const mysql = require('mysql');
const app = express();


app.use(express.static('public'));
app.use(express.text());
app.use(fileUpload());
app.use(express.raw({ type: 'image/*', limit: '5mb' }));


app.post('/api/single-file', (req, res) => {
  const contentType = req.header('content-type');
  if (contentType.includes('text/plain')) {
      res.set('Content-Type', 'text/plain');
      res.send(req.body);
  } else if (contentType.includes('multipart/form-data')) {
      const f = req.files.myfile;
      res.set('Content-Type', 'text/html');
      f.mv('./uploads/' + f.name);
      res.send(`${f.name}, ${f.size}, ${f.mimetype}`);
  } else {
      res.set('Content-Type', contentType);
      res.send(req.body);
  }
});


app.get('/', (req, res) => {
  res.send('Hello from my appHi');
});



var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'example',
    database : 'mysql'
  });
   
  connection.connect();
   
  connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
  });
   
 /*
  connection.connect(function(err) {
    if (err) throw err;
    connection.query("SELECT * FROM image_HTML_URl", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });
  connection.end();
*/

app.listen(3000, () => {
  console.log('listening on port 3000');
});

