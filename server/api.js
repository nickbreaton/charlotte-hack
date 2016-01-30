module.exports = function (app) {
  app.get('/api/:id/:lat/:lng', function (req, res) {

    // temporarily reuse their location
    res.end(JSON.stringify([
      {
        lat: Number(req.params.lat) - 1,
        lng: Number(req.params.lng) + 1,
        name: 'Some Hospital'
      },
      {
        lat: Number(req.params.lat) + 1.2,
        lng: Number(req.params.lng) + 0.75,
        name: 'Another Hospital'
      },
      {
        lat: Number(req.params.lat) - 2.2,
        lng: Number(req.params.lng) + 0.8,
        name: 'A Third Hospital'
      }
    ]));
  });
}
