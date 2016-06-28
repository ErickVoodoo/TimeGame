'use strict';

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
  res.sendfile('index.html');
});

io.on('connection', function (socket) {
  socket.on('established', function (msg) {
    console.log('User says:', msg);
    io.emit('getusername', { userid: Math.random() * 1000 });
  });

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});

http.listen(process.env.PORT || 3000, function () {
  console.log('listening on port 3000...');
});
