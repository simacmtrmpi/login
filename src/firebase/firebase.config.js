import {
    initializeApp
} from "firebase/app";
import {
    getAuth
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAKYPFkbidjBYA6HbWgIAiZFox4-6A3-t8",
    authDomain: "login-signup-recap.firebaseapp.com",
    projectId: "login-signup-recap",
    storageBucket: "login-signup-recap.appspot.com",
    messagingSenderId: "601168375981",
    appId: "1:601168375981:web:7b6022e98ae264e8db1624"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);