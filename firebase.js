import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

export const firebaseConfig = {
   apiKey: "AIzaSyAh7IPsDYHwOWA-84S91a90xt2w7ByVyK4",
  authDomain: "bounty-pirates.firebaseapp.com",
  projectId: "bounty-pirates",
  databaseURL: "https://bounty-pirates-default-rtdb.asia-southeast1.firebasedatabase.app/",
  storageBucket: "bounty-pirates.firebasestorage.app",
  messagingSenderId: "173236889235",
  appId: "1:173236889235:web:3aa6e33cf67a508ca84f66",
  measurementId: "G-G5CRDZZ7ZH"

};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
