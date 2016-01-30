module.exports = function (app) {
  app.get('/api/:numbers', function (req, res) {
    console.log(req.params.numbers);
  });
}
