var express = require('express');
var app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);
app.use(express.static(__dirname + '/public'));
server.listen(8080);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});


var gh;
var counter = 0;

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
  
  socket.on('my next event', function (data) {
    console.log(data);
  });
  
  socket.on('buttonTrigger', function(data){
  counter++;
  	socket.broadcast.emit('serverGotButton', { val1: '<BR>We have had '+counter+'conections' });
  });
  
  socket.on('triggerFromDotNetApp', function(data){
  counter++;
  console.log(data);
  	socket.broadcast.emit('triggerFromDotNetApp', data);
  });
});