import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAzUF73kFbj7we4g-ZfoY9kQdZMizkOulE",
  authDomain: "miniblog-41873.firebaseapp.com",
  projectId: "miniblog-41873",
  storageBucket: "miniblog-41873.appspot.com",
  messagingSenderId: "39790524635",
  appId: "1:39790524635:web:5ab2bf98a40c1136d534fe"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
