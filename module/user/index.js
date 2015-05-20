function User(ws){
	this.id;
	this.ws = ws;
	this.name;
}

User.prototype = {
	send: function(data){
		if (this.ws){
			this.ws.send(data);
		}
	}
};

module.exports = User;
