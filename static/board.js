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
  };

  var cfg = {
    draggable: true,
    dropOffBoard: 'snapback',
    position: 'start',
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
  };

  var board = ChessBoard('board', cfg);