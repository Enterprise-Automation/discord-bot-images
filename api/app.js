
const express = require('express');
const fileUpload = require('express-fileupload');
let sql = require('./sql.js')
const path = require('path');
const app = express();

//!image.random cat 
//!image.search id
//!image.search title

app.use(express.static('public'));
app.use(express.text());
app.use(fileUpload());
app.use(express.raw({ type: 'image/*', limit: '5mb' }));

let router = express.Router();

app.use('/api/', router);



router.get('/', function (req, res, next) {
  sql.get(function (data) {
    res.status(200).json({
      'status': 200,
      'statusText': 'OK',
      'message': 'All facts retrieved',
      'data': data
    });
  },
    function (err) {
      next(err);
    });
});


router.get('/:id', function (req, res, next) {
  sql.getById(req.params.id, function (data) {
    if (data) {
      res.status(200).json({
        'status': 200,
        'statusText': 'OK',
        'message': 'All images retrieved',
        'data': data
      });
    } else {
      res.status(404).json({
        'status': 404,
        'statusText': 'Not found',
        'message': `Image: '${req.params.id}' not be found.`,
        'error': {
          "code": "NOT_FOUND",
          "message": `Image: '${req.params.id}' not be found.`
        }
      });
    }
  }, function (err) {
    next(err);
  });
});



app.listen(3000, () => {
  console.log('listening on port 3000');
});
