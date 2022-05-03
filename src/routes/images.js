
 var images = require('../route_functions/images.js');

 module.exports = function (app) {
   app.get('/api/images', (req, res, next) => {
 
     var getResponse = images.func(req);
     getResponse.then((response) => {
       res.send(response)
     }).catch(err => {
       res.send(err);
     });
   });
 }
 



 

 
 
 