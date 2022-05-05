var images = require('../route_functions/images.js');

 module.exports = function (app) {
   app.get('/api/images', (req, res, next) => {
 
     var getResponse = images.get(req);
     getResponse.then((response) => {
       res.send(response)
     }).catch(err => {
       res.status(500).send(err);
     });
   });

   app.post("/api/images", function(req, res) {

    var getResponse = images.post(req);
    getResponse.then((response) => {
      res.send(response)
    }).catch(err => {
      res.status(500).send(err);
    });
  });
 }
 



 

 
 
 