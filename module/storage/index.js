function Storage(){
	this.storage = {};
}

Storage.prototype = {
	broadcast: function(data, id, all){
		if (this.countObject(this.storage)){
			for (var uid in this.storage){
				if (this.storage.hasOwnProperty(uid)){
					var user = this.storage[uid];
					var userId = user.id;
					
					if (!all && userId === id) continue;

					if (user.send) user.send(data);
				}
			}
		}
	},
	createId: function(){
		var id = this.countObject(this.storage);
		
		while(this.has(id)){
			id += 1;
		}

		return id;
	},
	countObject: function(obj){
		var number = 0;

		for (var o in obj){
			if (obj.hasOwnProperty(o)){
				number += 1;
			}
		}
		
		return number;
	},
	add: function(user){
		var id = this.createId();		

		if (this.has(id) === false){
			user.id = id;
			user.name = id;

			this.storage[id] = user;
		}

		return user;
	},
	has: function(id){
		return id in this.storage;
	},
	remove: function(id){
		if (this.has(id)){
			delete this.storage[id];
		}

		return this;
	}
};

module.exports = Storage;
