import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
	apiKey: "AIzaSyCLHInmVpGbq_u5CSb7wRIvdhWQPluoWvo",
	authDomain: "notake-f5ac7.firebaseapp.com",
	projectId: "notake-f5ac7",
	storageBucket: "notake-f5ac7.appspot.com",
	messagingSenderId: "260950359296",
	appId: "1:260950359296:web:61ca833fe739f0b2b987e5",
	measurementId: "G-B4RRTJXL36",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();
