cordova.define("com.tiltshiftfocus.cordova.plugin.clearCache.Cache", function(require, exports, module) { //////////////////////////////////////////
// Cache.js
// Copyright (C) 2014 Modern Alchemits OG <office@modalog.at>
//
//////////////////////////////////////////
var exec = require('cordova/exec');

var Cache =
{
    clear : function( success, error )
    {
        exec(success, error, "Cache", "clear", [])
    },
	cleartemp: function(success,error)
	{
		exec(success, error, "Cache", "cleartemp", [])
	}
}

module.exports = Cache;

});
