import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC5WmgjkE4IYCE6EUt2G5aiNl8FRvDUjYg",
  authDomain: "acesso-e-cadastro-de-usuario.firebaseapp.com",
  projectId: "acesso-e-cadastro-de-usuario",
  storageBucket: "acesso-e-cadastro-de-usuario.firebasestorage.app",
  messagingSenderId: "364736625723",
  appId: "1:364736625723:web:ab8d87de6f81a6d18d301e"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);