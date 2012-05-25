var Cookie = {
	data : {},
	options : {
		"expires" : null,
		"domain" : "",
		"path" : "",
		"secure" : false
	},

	init : function(options, data) {
		options = options || {};
    for (var option_name in options) {
    	if (Cookie.options[option_name]) {
	    	Cookie.options[option_name] = options[option_name];
    	}
    }

		var payload = Cookie.retrieve();
		if (payload) {
			Cookie.data = payload.evalJSON();
		}
		else {
			Cookie.data = data || {};
		}

		Cookie.store();
	},
	getData : function(key) {
		return Cookie.data[key];
	},
	setData : function(key, value) {
		Cookie.data[key] = value;
		Cookie.store();
	},
	removeData : function(key) {
		delete Cookie.data[key];
		Cookie.store();
	},
	retrieve : function() {
		var start = document.cookie.indexOf(Cookie.options.name + "=");

		if (start == -1) {
			return null;
		}

		if (Cookie.options.name != document.cookie.substr(start, Cookie.options.name.length)) {
			return null;
		}

		var len = start + Cookie.options.name.length + 1;
		var end = document.cookie.indexOf(';', len);

		if (end == -1) {
			end = document.cookie.length;
		}

		return unescape(document.cookie.substring(len, end));
	},
	store : function() {
		var expires = '';

		if (Cookie.options.expires) {
			var today = new Date();
			expires = Cookie.options.expires * 86400000;
			expires = ';expires=' + new Date(today.getTime() + expires);
		}

		document.cookie = Cookie.options.name + '=' + escape(Object.toJSON(Cookie.data)) + Cookie.getOptions() + expires;
	},
	erase : function() {
		document.cookie = Cookie.options.name + '=' + Cookie.getOptions() + ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
	},
	getOptions : function() {
		return (Cookie.options.path ? ';path=' + Cookie.options.path : '') + (Cookie.options.domain ? ';domain=' + Cookie.options.domain : '') + (Cookie.options.secure ? ';secure' : '');
	}
};
