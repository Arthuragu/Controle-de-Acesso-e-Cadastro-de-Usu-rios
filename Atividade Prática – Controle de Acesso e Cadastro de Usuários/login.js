import { auth, db } from "./firebase.js";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  collection, query, where, getDocs, doc, setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const PAGINA_PROTEGIDA = "protegida.html";

// Requisito 3: verifica se o e-mail já existe na coleção "usuarios"
async function emailJaExiste(email) {
  const q = query(collection(db, "usuarios"), where("email", "==", email));
  const snapshot = await getDocs(q);
  return !snapshot.empty;
}

// Bônus: registra nome, e-mail e último acesso no Firestore
async function registrarAcesso(usuario, nome) {
  await setDoc(
    doc(db, "usuarios", usuario.uid),
    {
      nome: nome || usuario.displayName || "",
      email: usuario.email,
      ultimoAcesso: new Date()
    },
    { merge: true } // não duplica: atualiza o mesmo documento do usuário
  );
}

// Requisito 1: login com Google
document.getElementById("btnGoogle").addEventListener("click", async () => {
  try {
    const provider = new GoogleAuthProvider();
    const resultado = await signInWithPopup(auth, provider);
    await registrarAcesso(resultado.user);
    window.location.href = PAGINA_PROTEGIDA;
  } catch (erro) {
    console.error(erro);
    alert("Erro ao entrar com Google: " + erro.message);
  }
});

// Requisito 2 + 3: cadastro com e-mail e senha
document.getElementById("btnCadastrar").addEventListener("click", async () => {
  const nome = document.getElementById("cadNome").value.trim();
  const email = document.getElementById("cadEmail").value.trim().toLowerCase();
  const senha = document.getElementById("cadSenha").value;

  if (!nome || !email || !senha) {
    alert("Preencha nome, e-mail e senha.");
    return;
  }
  if (senha.length < 6) {
    alert("A senha deve ter no mínimo 6 caracteres.");
    return;
  }

  try {
    // Requisito 3: checa duplicidade ANTES de gravar
    if (await emailJaExiste(email)) {
      alert("Este e-mail já está cadastrado.");
      return; // não grava nada
    }

    const cred = await createUserWithEmailAndPassword(auth, email, senha);
    await updateProfile(cred.user, { displayName: nome });
    await registrarAcesso(cred.user, nome);

    window.location.href = PAGINA_PROTEGIDA;
  } catch (erro) {
    console.error(erro);
    if (erro.code === "auth/email-already-in-use") {
      alert("Este e-mail já está cadastrado.");
    } else if (erro.code === "auth/invalid-email") {
      alert("E-mail inválido.");
    } else {
      alert("Erro no cadastro: " + erro.message);
    }
  }
});

// Login com e-mail e senha (para quem já tem conta)
document.getElementById("btnEntrar").addEventListener("click", async () => {
  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
  const senha = document.getElementById("loginSenha").value;

  if (!email || !senha) {
    alert("Informe e-mail e senha.");
    return;
  }

  try {
    const cred = await signInWithEmailAndPassword(auth, email, senha);
    await registrarAcesso(cred.user);
    window.location.href = PAGINA_PROTEGIDA;
  } catch (erro) {
    console.error(erro);
    alert("E-mail ou senha incorretos.");
  }
});