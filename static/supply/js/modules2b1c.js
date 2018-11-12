var modules = {
	data: [],
	add: function(module) {
		modules.data.push(module);
	},
	init: function() {

		var i = 0, len = modules.data.length;
		for(i; i < len; i++) {
			window[modules.data[i]].init();
		}

	}
};