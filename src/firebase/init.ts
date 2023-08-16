import { initializeApp } from 'firebase/app'
import { getDatabase } from "firebase/database";
const firebaseConfig = {
    apiKey: "AIzaSyBx_MsKnX6KoHbUa-nUor4s-bvpZKiwMCU",
    authDomain: "screen-recording-d0a23.firebaseapp.com",
    databaseURL: "https://screen-recording-d0a23-default-rtdb.firebaseio.com",
    projectId: "screen-recording-d0a23",
    storageBucket: "screen-recording-d0a23.appspot.com",
    messagingSenderId: "1060860227132",
    appId: "1:1060860227132:web:56b731919628463d6e1d39"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app);


export default database

