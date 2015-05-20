var express = require('express');
var path = require('path');
var fs = require('fs');

var app = express();

app.listen(8000);

app.use('/public', express.static(__dirname + '/views/public'));
app.get('/', function(req, res){

	res.sendFile(__dirname + '/views/index.html');

});

require('./module/wss')(app); // WebSocketServer
