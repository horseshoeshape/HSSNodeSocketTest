var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(8080);
//server.use(express.static(__dirname + '/images'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  
  socket.on('my other event', function (data) {
    console.log(data);
  });
	
  socket.on('buttonTrigger', function(data){
	//counter++;
	console.log(data);
  	socket.emit('serverGotButton', { val1: '<BR>serverGotButton' });
  });
  
  socket.on('triggerFromDotNetApp', function(data){
  //counter++;
  console.log(data);
  	socket.broadcast.emit('triggerFromDotNetApp', data);
  });
  
});