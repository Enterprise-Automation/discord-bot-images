
 var images = require('../route_functions/images.js');
 var imagesPost = require('../route_functions/imagesPost.js');

 module.exports = function (app) {
   app.get('/api/images', (req, res, next) => {
 
     var getResponse = images.func(req);
     getResponse.then((response) => {
       res.send(response)
     }).catch(err => {
       res.send(err);
     });
   });

   app.post("/api/images", function(req, res) {

    var getResponse = imagesPost.func(req);
    getResponse.then((response) => {
      res.send(response)
    }).catch(err => {
      res.send(err);
    });
  });
 }
 



 

 
 
 