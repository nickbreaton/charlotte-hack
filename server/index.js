var express = require('express');
var path    = require('path');

var app = express();

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
