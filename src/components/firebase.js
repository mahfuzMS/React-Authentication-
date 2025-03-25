// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCVXS5w_5y-PTcNyoBGlpe5bFcEOMLUnAI",
    authDomain: "login-authentication-dca2e.firebaseapp.com",
    projectId: "login-authentication-dca2e",
    storageBucket: "login-authentication-dca2e.firebasestorage.app",
    messagingSenderId: "432728929750",
    appId: "1:432728929750:web:5c48053352972f98936077",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
