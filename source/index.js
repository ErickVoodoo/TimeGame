import Const from './constants';

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendfile('index.html');
});

io.on(Const.EMIT.CONNECTION, socket => {
  console.log('Undefined user connected');

  socket.on(Const.EMIT.CLIENT_LOGIN, ({ username, userId }) => {
    console.log('CLIENT_LOGIN');
    console.log(`Username: ${username}, UserId: ${userId}`);
    io.emit(Const.EMIT.SERVER_LOGIN,
      { username, date: new Date(), message: 'You are logged in' }
    );
  });

  socket.on(Const.EMIT.CLIENT_REGISTRATION, ({ username, date }) => {
    console.log('CLIENT_REGISTRATION');
    console.log(`Username: ${username}, Date: ${date}`);
    io.emit(Const.EMIT.SERVER_REGISTRATION,
      { username, date: new Date(), message: 'You are registered', userId: Math.round(Math.random() * 10000)}
    );
  });

  socket.on(Const.EMIT.CLIENT_LOGOUT, ({ userId }) => {
    io.emit(Const.EMIT.SERVER_LOGOUT,
      { userId, message: 'You are logged out' }
    );
  });

  socket.on(Const.EMIT.DISCONNECT, ({ userId }) => {
    userId ?
     console.log(`User disconnected, id: ${userId}`) :
     console.log(`Undefined user disconnected`);
  });
});

http.listen(Const.PORT, () => {
  console.log('listening on port 3000...');
});
