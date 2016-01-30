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

app.listen(8080);
