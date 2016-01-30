'use strict';

var cp = require('child_process');
var express = require('express');

var app = express();

app.get('/', (req, res) => {
   cp.exec('python test.py', function (err, data) {
      res.end(data);    
   });
});

app.listen(8080);


let python = cp.spawn('python', ['-v']);
   
python.stdout.on('data', function (data) {
    console.log(data);
});