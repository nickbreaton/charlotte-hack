var cp = require('child_process');
var express = require('express');
var path = require('path');

var app = express();

app.get('/hi', (req, res) => {
   cp.exec('python test.py', function (err, data) {
      res.end(data);
   });
});

// serve client folder
app.use(express.static(path.join(__dirname, '../client/')));

var server = app.listen(8080, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('My site is listening at http://%s:%s', host, port);

});
