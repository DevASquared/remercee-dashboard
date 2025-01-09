import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const fireStoreConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY_STORAGE,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN_STORAGE,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID_STORAGE,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID_STORAGE,
	appId: import.meta.env.VITE_FIREBASE_APP_ID_STORAGE,
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID_STORAGE
};

// Initialiser Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getFirestore(initializeApp(fireStoreConfig, "storage"));
