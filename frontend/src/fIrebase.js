// firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "app-a2602.firebaseapp.com",
  databaseURL: "https://app-a2602-default-rtdb.firebaseio.com",
  projectId: "app-a2602",
  storageBucket: "app-a2602.firebasestorage.app",
  messagingSenderId: "886346301354",
  appId: "1:886346301354:web:cd0a2709df0788a1e2f5d3",
  measurementId: "G-TVNQB379ER",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Auth
const auth = getAuth(app);

// Analytics (safe initialization)
let analytics;
isSupported().then((yes) => {
  if (yes) {
    analytics = getAnalytics(app);
  }
});

export { app, auth };