(function(){
	
	var messages = document.getElementById('messages');
	var message = document.getElementById('message');
	var send = document.getElementById('send');

	function createMessage(data){
		var messageHTML = [];
		var msg = document.createElement('div');

		messageHTML.push('<span>' + data.time + '</span>');
		messageHTML.push('<span>' + data.user.name + '</span>');
		messageHTML.push('<span>' + data.message + '</span>');

		msg.innerHTML = messageHTML.join('');
		msg.className = 'msg';

		messages.appendChild(msg);
	}

	function WebSocketReconnect(url){
		this.url = url;	
	}

	WebSocketReconnect.prototype = {
		connect: function(){
			if (window.WebSocket){
				var self = this;

				var ws = this.ws = new WebSocket(this.url);

				var wsOpen = function(event){};
				var wsError = function(event){};
				var wsClose = function(event){
					self.connect();
				};

				var wsMessage = function(event){
					var data = event.data;

					if (typeof data === 'string'){

						var parseData, time, user, message, action;

						try {
	
							parseData = JSON.parse(data);
							action = parseData.action;
							time = parseData.time;
							user = parseData.user;

							switch(action){
								case 'newConnect':

									createMessage({
										time: time,
										message: 'Зашел новый пользователь',
										user: user
									});									

									break;
								case 'newMessage':

									message = parseData.message;

									createMessage({
										time: time,
										message: message,
										user: user
									});
			
									break;
								case 'closeConnect':

									createMessage({
										time: time,
										message: 'Пользователь вышел',
										user: user
									});

									break;
							}

							
						} catch(err){}

					}
				};		

				ws.onopen = wsOpen;
				ws.onerror = wsError;
				ws.onclose = wsClose;
				ws.onmessage = wsMessage;
			}
		},
		send: function(data){
			var ws = this.ws;
			if (ws.readyState === ws.OPEN){
				ws.send(data);
			}
		}
	};
	
	var ws = new WebSocketReconnect('ws://192.168.0.103:8001');
	ws.connect();

	send.onclick = function(event){
		event.preventDefault();
		var value = message.value;
		if (value && value.length){
			ws.send(value);		
		}
	};

})();
