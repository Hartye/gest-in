import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyD5YxvhDgNidEnS16cdqBxbJWbvNrYkZzo",
//   authDomain: "gestin-bdf16.firebaseapp.com",
//   projectId: "gestin-bdf16",
//   storageBucket: "gestin-bdf16.appspot.com",
//   messagingSenderId: "774999163742",
//   appId: "1:774999163742:web:50627a33532c904d3645cf"
// };

// Alternative firebase project
const firebaseConfig = {
  apiKey: "AIzaSyDXXqtk4MrZGxwwEDzgTNXV29PEHAzSLG8",
  authDomain: "gestin-alternative.firebaseapp.com",
  projectId: "gestin-alternative",
  storageBucket: "gestin-alternative.appspot.com",
  messagingSenderId: "581857994149",
  appId: "1:581857994149:web:e8df39157cc203f918b44c"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);