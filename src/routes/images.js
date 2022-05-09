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

  app.get('/api/people', async (req, res) => {
    try {
      const person = await getPerson()
      res.json(person)
    } catch (err) {
      res.json({ error: "Something went wrong" })
    }
  })

  app.post("/api/images", function (req, res) {

    var getResponse = images.post(req);
    getResponse.then((response) => {
      res.send(response)
    }).catch(err => {
      console.log('status code: ' + err.status_code);
      console.log('status response: ' + err.response);
      res.status(err.status_code).send(err.response);
    });
  });
}








