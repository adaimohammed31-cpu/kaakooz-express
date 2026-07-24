import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAClyqUeUhWBBOHhhriVW04HZxzP3tgOOs",
  authDomain: "kakooz-express.firebaseapp.com",
  projectId: "kakooz-express",
  storageBucket: "kakooz-express.firebasestorage.app",
  messagingSenderId: "755647745722",
  appId: "1:755647745722:web:3476aac170791be0b4bc83",
  measurementId: "G-KNQFRXV7PB"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
  db,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  onSnapshot
};
