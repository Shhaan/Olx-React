import  {initializeApp} from 'firebase/app';
import  '@firebase/auth'
import '@firebase/firestore'
import '@firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBhhcxHMAhwbFTO8dwY4kXJct_gHBs4EV0",
    authDomain: "fir-713b4.firebaseapp.com",
    projectId: "fir-713b4",
    storageBucket: "fir-713b4.appspot.com",
    messagingSenderId: "1025482780647",
    appId: "1:1025482780647:web:84adb6f9da8f99d0a5d742",
    measurementId: "G-4KGQLYX8G8"
  };
 
export default  initializeApp(firebaseConfig);