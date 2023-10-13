import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyACIpoeCK_S7gtiJ-dXNm4vm5gxAmhzSTM",
    authDomain: "my-app-35a12.firebaseapp.com",
    projectId: "my-app-35a12",
    storageBucket: "my-app-35a12.appspot.com",
    messagingSenderId: "893360523618",
    appId: "1:893360523618:web:6e2daeb4824f069604843b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app