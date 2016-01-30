var cp = require('child_process');

module.exports = function (app) {
  app.get('/api/:numbers', function (req, res) {
    res.end();
  });
}
