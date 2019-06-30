var firebase;
sap.ui.define([
	"sap/ui/model/json/JSONModel"
], function (JSONModel) {
	"use strict";

	// Firebase-config retrieved from the Firebase-console
	var firebaseConfig = {
		apiKey: "AIzaSyBz3SYxZCQSuWcdKQn946d-tC2DXgOIdKw",
		authDomain: "fb-withsapui5.firebaseapp.com",
		databaseURL: "https://fb-withsapui5.firebaseio.com",
		projectId: "fb-withsapui5",
		storageBucket: "",
		messagingSenderId: "240257894116",
		appId: "1:240257894116:web:c198c2e9af26e5f3"
	};
	return {
		initializeFirebase: function () {
			//Init firebase with firebase-config
			firebase.initializeApp(firebaseConfig);

			// Create a Firestore reference
			var firestore = firebase.firestore();
			// var firebase1 = firebase;

			// Firebase services object
			var oFirebase = {
				firestore: firestore,
				firebase: firebase
			};

			// Create a Firebase model out of the oFirebase service object which contains all required Firebase services
			var fbModel = new JSONModel(oFirebase);

			// Return the Firebase Model
			return fbModel;
		}

	};
});