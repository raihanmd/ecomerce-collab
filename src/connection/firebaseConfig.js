import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDoVLSbOS8I3IYYKWkkAtcouqx99yY_IdU",
  authDomain: "ecomerce-bc524.firebaseapp.com",
  projectId: "ecomerce-bc524",
  storageBucket: "ecomerce-bc524.appspot.com",
  messagingSenderId: "171969106692",
  appId: "1:171969106692:web:00ef324f2d66b0307bb651",
  measurementId: "G-FGNP8MTPMS",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
