var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendfile('index.html');
});

io.on('connection', socket => {
  socket.on('established', msg => {
    console.log('User says:', msg);
    io.emit('getusername',
      { userid: Math.random() * 1000 }
    );
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(3000, () => {
  console.log('listening on port 3000...');
});
