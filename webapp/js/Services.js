var sThatRef;
sap.ui.define([], function() {
	"use strict";
	var returnObj = {
		initService: function(sThat) {
			sThatRef = sThat;
		}
	};
	return returnObj;
});