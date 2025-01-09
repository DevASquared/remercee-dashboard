import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";


const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
	measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const fireStoreConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY_STORAGE,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN_STORAGE,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID_STORAGE,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID_STORAGE,
	appId: process.env.REACT_APP_FIREBASE_APP_ID_STORAGE,
	measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID_STORAGE
};

// Initialiser Firebase export const app = initializeApp(firebaseConfig); export const storage = getFirestore(initializeApp(fireStoreConfig, "storage"));

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getFirestore(initializeApp(fireStoreConfig, "storage"));
