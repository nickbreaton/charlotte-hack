var express = require('express');
var ejs     = require('ejs');
var fs      = require('fs');
var path    = require('path');

var app = express();

// serve icon as different colors
app.get('/pin.svg/:color', function (req, res) {
  fs.readFile(path.join(__dirname, '../views/pin.svg'), function (err, data) {
    if (err) console.error(err);

    res.writeHead(200, { 'Content-Type': 'image/svg+xml' });
    res.end(ejs.render(data.toString(), {
      color: req.params.color
    }));

  });
});

// static assets
app.use('/', express.static(path.join(__dirname, '../public/')));
app.use('/styles', express.static(path.join(__dirname, '../styles/')));
app.use('/scripts', express.static(path.join(__dirname, '../scripts/')));

// vendor assets
app.use('/vendor', express.static(path.join(__dirname, '../node_modules/jquery/dist/')));

// serve base site
app.use('*', express.static(path.join(__dirname, '../views/')));

app.listen(3000, function () {
  console.log('Server listening at http://localhost:3000');
});
