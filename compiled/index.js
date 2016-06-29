'use strict';

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
  res.sendfile('index.html');
});

io.on(_constants2.default.EMIT.CONNECTION, function (socket) {
  console.log('Undefined user connected');

  socket.on(_constants2.default.EMIT.CLIENT_LOGIN, function (_ref) {
    var username = _ref.username;
    var userId = _ref.userId;

    console.log('CLIENT_LOGIN');
    console.log('Username: ' + username + ', UserId: ' + userId);
    io.emit(_constants2.default.EMIT.SERVER_LOGIN, { username: username, date: new Date(), message: 'You are logged in' });
  });

  socket.on(_constants2.default.EMIT.CLIENT_REGISTRATION, function (_ref2) {
    var username = _ref2.username;
    var date = _ref2.date;

    console.log('CLIENT_REGISTRATION');
    console.log('Username: ' + username + ', Date: ' + date);
    io.emit(_constants2.default.EMIT.SERVER_REGISTRATION, { username: username, date: new Date(), message: 'You are registered', userId: Math.round(Math.random() * 10000) });
  });

  socket.on(_constants2.default.EMIT.CLIENT_LOGOUT, function (_ref3) {
    var userId = _ref3.userId;

    io.emit(_constants2.default.EMIT.SERVER_LOGOUT, { userId: userId, message: 'You are logged out' });
  });

  socket.on(_constants2.default.EMIT.DISCONNECT, function (_ref4) {
    var userId = _ref4.userId;

    userId ? console.log('User disconnected, id: ' + userId) : console.log('Undefined user disconnected');
  });
});

http.listen(_constants2.default.PORT, function () {
  console.log('listening on port 3000...');
});