var Cookie = {
	data : {},
	name : 'cookie_name',
	options : {
		"name": null,
		"max-age": null,
		"expires": null,
		"domain": "",
		"path": "",
		"secure" : false
	},

	init : function(name, options) {
		this.name = name || this.name; 
		
		options = options || {};
		this.options.max_age = options.max_age || this.options.max_age;
		this.options.expires = options.expires || this.options.expires;
		this.options.domain = options.domain || this.options.domain;
		this.options.path = options.path || this.options.path;
		this.options.secure = options.secure || this.options.secure;
		
		var payload = this.find();
		if (payload) {
			this.data = payload;
		}
		else {
			this.data = {};
		}
	},
	// public
	get : function(key) {
		return this.data[key];
	},
	set : function(key, value) {
		this.data[key] = value;
		this.save();
	},
	delete : function(key) {
		delete this.data[key];
		this.save();
	},
	save : function() {
		document.cookie = this.name + '=' + escape(JSON.toString(this.data)) + this.getOptions();
	},
	destroy : function() {
		document.cookie = this.name + '=' + this.getOptions(false) + ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
	},
	// private
	find : function() {
		var start = document.cookie.indexOf(this.name + "=");

		if (start == -1) {
			return null;
		}

		if (this.name != document.cookie.substr(start, this.name.length)) {
			return null;
		}

		var len = start + this.name.length + 1;
		var end = document.cookie.indexOf(';', len);

		if (end == -1) {
			end = document.cookie.length;
		}

		return unescape(document.cookie.substring(len, end));
	},
	getOptions : function(include_expires) {
		include_expires = include_expires !== false;
		
		var opts = []; 

		for (key in this.options) {
			if (this.options[key]) {
				if (key == 'expires') {
					if (include_expires) {
						var today = new Date();
						var ttl = this.options.expires * 86400000;
						opts.push('expires=' + new Date(today.getTime() + ttl));
					}
				}
				else if (key == 'secure') {
					opts.push('secure');
				}
				else {
					opts.push(key + '=' + this.options[key]);
				}
			}
		}

		return opts.join(';')
	}
};
