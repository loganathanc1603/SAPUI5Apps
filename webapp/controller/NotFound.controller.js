sap.ui.define([
		"com/sap/ui5/app/ZSAPUI5ALLAPP/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("com.sap.ui5.app.ZSAPUI5ALLAPP.controller.NotFound", {

			/**
			 * Navigates to the worklist when the link is pressed
			 * @public
			 */
			onLinkPressed : function () {
				this.getRouter().navTo("worklist");
			}

		});

	}
);