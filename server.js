var express = require('express');
var path = require("path");

var app = express();

app.use(express.static(path.join(__dirname, "./static")));

// app.get('/', function(request, response) {
//     response.sendFile('chess.html');
// });

app.listen(8000, function() {
    console.log('listening on 8000');
});