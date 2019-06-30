sap.ui.define([], function() {
	"use strict";

	return {
		getStatusIcon: function(sValue) {
			var out = "sap-icon://accept";
			if (sValue) {
				switch (sValue) {
					case "Shipped":
						out = "sap-icon://accept";
						break;
					case "Missing":
						out = "sap-icon://status-critical";
						break;
					case "Preparing":
						out = "sap-icon://begin";
						break;
					default:
						out = "sap-icon://status-negative";
						break;
				}
			}
			return out;
		},

		//Date format 

		setDateFormat: function(sValue) {
			if (sValue) {
				var d = new Date(sValue * 1000);
				var date = sap.ui.core.format.DateFormat.getInstance({
					pattern: "dd.MM.yyyy HH:mm:ss"
				});
				return date.format(d);
			}
		}

	};

});
