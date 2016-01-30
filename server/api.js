module.exports = function (app) {
  app.get('/api/:id/:lat/:lng', function (req, res) {

    // temporarily reuse their location
    res.end(JSON.stringify({
      lat: Number(req.params.lat),
      lng: Number(req.params.lng)
    }));
  });
}
