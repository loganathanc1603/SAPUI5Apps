/*global QUnit*/

jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
	"sap/ui/test/Opa5",
	"com/sap/ui5/app/ZSAPUI5ALLAPP/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"com/sap/ui5/app/ZSAPUI5ALLAPP/test/integration/pages/Worklist",
	"com/sap/ui5/app/ZSAPUI5ALLAPP/test/integration/pages/Object",
	"com/sap/ui5/app/ZSAPUI5ALLAPP/test/integration/pages/NotFound",
	"com/sap/ui5/app/ZSAPUI5ALLAPP/test/integration/pages/Browser",
	"com/sap/ui5/app/ZSAPUI5ALLAPP/test/integration/pages/App"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "com.sap.ui5.app.ZSAPUI5ALLAPP.view."
	});

	sap.ui.require([
		"com/sap/ui5/app/ZSAPUI5ALLAPP/test/integration/WorklistJourney",
		"com/sap/ui5/app/ZSAPUI5ALLAPP/test/integration/ObjectJourney",
		"com/sap/ui5/app/ZSAPUI5ALLAPP/test/integration/NavigationJourney",
		"com/sap/ui5/app/ZSAPUI5ALLAPP/test/integration/NotFoundJourney",
		"com/sap/ui5/app/ZSAPUI5ALLAPP/test/integration/FLPIntegrationJourney"
	], function () {
		QUnit.start();
	});
});