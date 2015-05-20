var WebSocket = require('ws');
var Storage = require('../storage');
var User = require('../user');

module.exports = function(server){
	
	var storage = new Storage();

	var WebSocketServer = new WebSocket.Server({
		port: 8001,
		server: server	
	});

	WebSocketServer.on('connection', function(ws){
		var user = storage.add(new User(ws));
		var userId = user.id;

		storage.broadcast(JSON.stringify({
			action: 'newConnect',
			time: new Date(),
			user: {
				id: userId,
				name: user.name
			}
		}), userId, false);

		ws.on('message', function(data){

			storage.broadcast(JSON.stringify({
				action: 'newMessage',
				time: new Date(),
				message: data,
				user: {
					id: userId,
					name: user.name
				}
			}), userId, true);

		});

		ws.on('close', function(){
			storage.remove(userId);

			storage.broadcast(JSON.stringify({
				action: 'closeConnect',
				time: new Date(),
				user: {
					id: userId,
					name: user.name
				}
			}), userId, false);

		});
	});

};
