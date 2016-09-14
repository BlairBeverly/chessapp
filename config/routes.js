module.exports = function Route(app, server) {
    var players = [];

    var io = require('socket.io').listen(server);

    

    io.sockets.on('connection', function (socket) {
      // console.log(socket.id);
      socket.emit('players', {players:players})
      // socket.emit('assign_color', {color:color})

      socket.on('user_joined', function(data) {
        players.push( {user:data.user, id:socket.id} );
        io.emit('add_user', {user: data.user});
      })

      //broadcast moves from one player to the other player 
      socket.on('player_move', function (data) {
        socket.broadcast.emit("player_move", {from:data.from, to:data.to, promotion:data.promotion});
      })

      // socket.on('challenge', function(data){

    
      // })

    })

}