 
import { initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";



const config = {
    apiKey: "AIzaSyBq7ahfJZ9w5kgFNVm9oY1WCmja3-_TX3U",
    authDomain: "chatapp-c200.firebaseapp.com",
    projectId: "chatapp-c200",
    storageBucket: "chatapp-c200.appspot.com",
    messagingSenderId: "315533809049",
    appId: "1:315533809049:web:f3993990f14ff89f89af08",
}
// Initialize Firebase
//  firebase.initializeApp(config);
 const app =  initializeApp(config);
const db = getFirestore(app);
const auth = getAuth(app);
const database = getDatabase(app)

  export  {db, auth, database};