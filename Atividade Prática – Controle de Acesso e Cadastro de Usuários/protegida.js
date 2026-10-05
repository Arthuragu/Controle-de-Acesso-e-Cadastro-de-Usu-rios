import { auth } from "./firebase.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Requisito 4: valida a sessão
onAuthStateChanged(auth, (usuario) => {
  if (!usuario) {
    // não logado: volta para o login
    window.location.href = "index.html";
    return;
  }

  // Requisito 5: exibe nome e e-mail
  document.getElementById("boasVindas").textContent =
    "Bem-vindo(a), " + (usuario.displayName || "Usuário");
  document.getElementById("emailUsuario").textContent =
    "Email: " + usuario.email;

  // só mostra o conteúdo depois de confirmar que está logado
  document.getElementById("conteudo").style.display = "block";
});

// Requisito 6: logout
document.getElementById("btnSair").addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "index.html";
});