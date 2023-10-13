import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyCBL7gQi55RkhEvBOZyfLopIGLz98aRYP4",
    authDomain: "hanhan-store.firebaseapp.com",
    projectId: "hanhan-store",
    storageBucket: "hanhan-store.appspot.com",
    messagingSenderId: "969360925763",
    appId: "1:969360925763:web:cdcbff8edd0fc669ca20f6",
    measurementId: "G-RB5FHH93TM"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app