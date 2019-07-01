/*global location history */
var firebase;
sap.ui.define([
	"com/sap/ui5/app/ZSAPUI5ALLAPP/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"com/sap/ui5/app/ZSAPUI5ALLAPP/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"com/sap/ui5/app/ZSAPUI5ALLAPP/Firebase",
	"sap/m/MessageBox",
	"com/sap/ui5/app/ZSAPUI5ALLAPP/js/Services",
	"com/sap/ui5/app/ZSAPUI5ALLAPP/utilities/firebase-app",
	"com/sap/ui5/app/ZSAPUI5ALLAPP/utilities/firebase-firestore",
	"com/sap/ui5/app/ZSAPUI5ALLAPP/utilities/firebase"
], function(BaseController, JSONModel, History, formatter, Filter, FilterOperator, Firebase, MessageBox, Services) {
	"use strict";

	return BaseController.extend("com.sap.ui5.app.ZSAPUI5ALLAPP.controller.Worklist", {
		formatter: formatter,
		Services: Services,
		onInit: function() {
			Services.initService(this);
			this.WLModel = new JSONModel({
				iBusy: false,
				iBusyDelay: 0
			});
			this.getView().setModel(this.WLModel, "WLModel");
		},
		onSelectIcTb: function(evt) {
			this.WLModel.setProperty("/iBusy", true);
			this.WLModel.setProperty("/iBusyDelay", 10);
			var oSelectedKey = evt.getSource().getSelectedKey();
			if (oSelectedKey === "iCTab_Two_FireBase") {
				var firebaseModel = this.getView().getModel("firebase");
				if (!firebaseModel) {
					this.setModel(Firebase.initializeFirebase(), "firebase");
				}
				var firestore = this.getView().getModel("firebase").getData().firestore,
					items = firestore.collection("Shipments");

				// Get single set of shipments once
				this.getShipments(items);
			} else {
				this.WLModel.setProperty("/iBusy", false);
				return;
			}
		},

		getShipments: function(collRefShipments) {
			var fnCallBack = function(collection) {
				var shipmentModel = new JSONModel([]);
				var shipments = collection.docs.map(function(docShipment) {
					// var data = docShipment.data().Timestamp.seconds;
					return docShipment.data();
				});
				shipmentModel.setData(shipments);
				this.getView().setModel(shipmentModel, "shipmentModel");
				this.WLModel.setProperty("/iBusy", false);
			}.bind(this);
			collRefShipments.get().then(fnCallBack);

		},

		onPrsAddCFireStore: function() {
			if (this.DiaAdd) {
				this.DiaAdd.destroy();
				this.DiaAdd = null;
			}
			this.DiaAdd = sap.ui.xmlfragment("com.sap.ui5.app.ZSAPUI5ALLAPP.fragments.CreateData", this);
			this.getView().addDependent(this.DiaAdd);
			var d = new Date().getTime();
			sap.ui.getCore().byId("iPCodeId").setValue(d);
			this.DiaAdd.open();
		},

		onPrsOkAdd: function() {
			this.WLModel.setProperty("/iBusy", true);
			var code = sap.ui.getCore().byId("iPCodeId").getValue(),
				origin = sap.ui.getCore().byId("iPOriginIp").getValue(),
				destination = sap.ui.getCore().byId("iPDestinationId").getValue(),
				status = sap.ui.getCore().byId("selStatusId").getSelectedKey();

			var firestore = this.getView().getModel("firebase").getData().firestore;
			firestore.collection("Shipments").add({
				Code: code,
				Origin: origin.toUpperCase(),
				Destination: destination.toUpperCase(),
				Status: status,
				Timestamp: firebase.firestore.FieldValue.serverTimestamp()
			}).then(function(dataRef) {
				this.DiaAdd.close();
				this.WLModel.setProperty("/iBusy", false);
				this.byId("IcTbId").fireSelect({
					selectedKey: "iCTab_Two_FireBase"
				});
				MessageBox.show("Data Created Successfully.", MessageBox.Icon.SUCCESS, "Success");
			}.bind(this)).catch(function(errRef) {
				this.WLModel.setProperty("/iBusy", false);
				MessageBox.show("Data creation has been failed..", MessageBox.Icon.ERROR, "Error");
			});
		},

		onPrsFireAuth: function(evt) {
			var key = evt.getSource().data("filterId");
			var email = this.byId("iPEmailId").getValue(),
				pwd = this.byId("iPPwdId").getValue(),
				firebaseModel = this.getView().getModel("firebase"),
				auth,
				errMsg;
			if (!firebaseModel) {
				this.setModel(Firebase.initializeFirebase(), "firebase");
			}
			if (key === "SI") {
				auth = this.getView().getModel("firebase").getData().firebase.auth();
				auth.signInWithEmailAndPassword(email, pwd).then(function(msg) {
					errMsg = msg;
				}).catch(function(err) {
					errMsg = err.message;
				});
			} else if (key === "SU") {
				auth = this.getView().getModel("firebase").getData().firebase.auth();
				auth.createUserWithEmailAndPassword(email, pwd).then(function(success) {
					// var t = success;
					MessageBox.show("Sign Up Successfully Completed.", MessageBox.Icon.SUCCESS, "Success");
				}.bind(this)).catch(function(error) {
					// var errorCode = error.code;
					var errorMessage = error.message;
					MessageBox.show(errorMessage, MessageBox.Icon.ERROR, "Error");
				}.bind(this));
			} else if (key === "SO") {

			}
		}

	});
});