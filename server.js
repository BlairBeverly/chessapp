var express = require('./static/node_modules/express');
var path = require("path");

var app = express();

app.use(express.static(path.join(__dirname, "./static")));

// app.get('/', function(request, response) {
//     response.sendFile('chess.html');
// });

var server = app.listen(8000, function() {
    console.log('listening on 8000');
});

var io = require('./static/node_modules/socket.io').listen(server);

io.sockets.on('connection', function (socket) {
  console.log("WE ARE USING SOCKETS!");
  console.log(socket.id);
  //all the socket code goes in here!
  socket.on('player_move', function (data) {
    console.log(data);
    socket.broadcast.emit("player_move", {from:data.from, to:data.to, promotion:data.promotion});
  })
})