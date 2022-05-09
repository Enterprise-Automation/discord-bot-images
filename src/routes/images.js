var images = require('../route_functions/images.js');

module.exports = function (app) {

  app.get('/api/images', async (req, res) => {

    try {
      var getResponse = await images.get(req);
      res.json(getResponse)

    } catch (err) {
      res.json(err);
    }
  });

  app.post("/api/images", async (req, res) =>{

    try {
      var getResponse = await images.post(req);
      res.json(getResponse)

    } catch (err) {
      res.json(err);
    }
  });
}








