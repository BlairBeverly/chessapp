$(document).ready(function (){  
  var game = new Chess();

  // update board for castling, en passant and pawn promotion
  var onSnapEnd = function() {
    board.position(game.fen());

  };

  var onDrop = function(source, target) {
    var move = game.move({from:source, to:target, promotion: 'q'})

    if (move == null){
      return 'snapback';
    }
    else {
      socket.emit("player_move", {from:source, to:target, promotion: 'q'});
    }
  };

  var cfg = {
    draggable: true,
    dropOffBoard: 'snapback',
    position: 'start',
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
  };

  var board = ChessBoard('board', cfg);

  // this triggers the connection event in our server
  var socket = io.connect();

  socket.on('player_move', function (data){
      game.move({from:data.from, to:data.to, promotion:data.promotion});
      board.position(game.fen());
  })

})