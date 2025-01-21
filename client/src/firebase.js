import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

// const Google_Api = process.env.REACT_APP_GOOGLE_API
console.log(process.env.REACT_APP_TEST_VARIABLE)

const firebaseConfig = {
    apiKey: process.env.REACT_APP_GOOGLE_API,
    authDomain: "fir-23dc3.firebaseapp.com",
    projectId: "fir-23dc3",
    storageBucket: "fir-23dc3.firebasestorage.app",
    messagingSenderId: "761631924426",
    appId: "1:761631924426:web:533fa173884a0c08fad433"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;