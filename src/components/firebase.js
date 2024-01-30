// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAS2SxF-2SFbBR1r7WsCh6B1dQaliekPv4",
  authDomain: "my-hms-project-b6cc9.firebaseapp.com",
  projectId: "my-hms-project-b6cc9",
  storageBucket: "my-hms-project-b6cc9.appspot.com",
  messagingSenderId: "928346511766",
  appId: "1:928346511766:web:30e7c16e788095d4dd65b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app, /* other exports if any */ };
