import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD7o0Ji7n7ipxiwdfWQFgTVwz5yFdjw5nI",
    authDomain: "instagram-clone-react-4e682.firebaseapp.com",
    projectId: "instagram-clone-react-4e682",
    storageBucket: "instagram-clone-react-4e682.appspot.com",
    messagingSenderId: "1068407164181",
    appId: "1:1068407164181:web:c9a437586cb4916203ed1c",
    measurementId: "G-VENNL0GQGX"
  };
const firebaseApp=firebase.initializeApp(firebaseConfig);

//initializing database
const db=firebaseApp.firestore();
//for authentication
const auth=firebase.auth();
//auth is used for login etc
const storage= firebase.storage();
// storage is used to store pics etc that we upload to firebase
export { db , auth, storage };
//we want to use it outside the file