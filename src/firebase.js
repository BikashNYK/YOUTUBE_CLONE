import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA3y5mqX9dX2KVeua8HkdlhO2io2dH_Lmw",
    authDomain: "yotube-clone-56d4f.firebaseapp.com",
    projectId: "yotube-clone-56d4f",
    storageBucket: "yotube-clone-56d4f.appspot.com",
    messagingSenderId: "227155519111",
    appId: "1:227155519111:web:2401f6972f4126eaef7a22",
    measurementId: "G-9YSPK24E50"
};
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp)
// const db = getFirestore(firebaseApp)

export default auth