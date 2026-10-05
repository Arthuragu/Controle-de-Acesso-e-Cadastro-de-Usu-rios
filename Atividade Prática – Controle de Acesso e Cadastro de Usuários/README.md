# Controle de Acesso com Firebase Authentication e Firestore

Atividade Extra 3 (composição de nota) — Católica.
Área restrita de um sistema acadêmico com login via Google, cadastro com e-mail e senha, validação de e-mail duplicado, página protegida e logout.

## Tecnologias

- HTML, CSS e JavaScript (ES Modules)
- Firebase Authentication (Google e E-mail/Senha)
- Cloud Firestore
- Firebase JS SDK 10.12.2 (via CDN, sem necessidade de `npm install`)

## Estrutura

```
├── index.html        # Tela de login, cadastro e botão "Entrar com Google"
├── login.js          # Lógica de login, cadastro e validação de e-mail duplicado
├── protegida.html    # Página restrita
├── protegida.js      # onAuthStateChanged, exibição dos dados e logout
├── firebase.js       # Configuração e inicialização do Firebase
├── style.css         # Estilos
├── firestore.rules   # Regras de teste do Firestore
└── README.md
```

## Requisitos atendidos

| # | Requisito | Onde |
|---|-----------|------|
| 1 | Login com Google | `login.js` (`signInWithPopup`) |
| 2 | Cadastro com nome, e-mail e senha | `login.js` (`createUserWithEmailAndPassword`) |
| 3 | Validação de e-mail duplicado | `login.js` (`emailJaExiste` + `alert`) |
| 4 | Página protegida | `protegida.js` (`onAuthStateChanged`) |
| 5 | Exibição de nome e e-mail | `protegida.js` |
| 6 | Logout | `protegida.js` (`signOut`) |
| Bônus | Registro de `nome`, `email` e `ultimoAcesso` | `login.js` (`registrarAcesso`) |

## Como configurar o Firebase

1. Crie um projeto em https://console.firebase.google.com
2. Adicione um app **Web** (`</>`) e copie o `firebaseConfig`.
3. Cole o `firebaseConfig` no arquivo `firebase.js`.
4. Em **Authentication → Sign-in method**, ative **Google** e **E-mail/senha**.
5. Em **Firestore Database**, crie o banco (modo de teste, região `southamerica-east1`).
6. Em **Firestore → Regras**, cole o conteúdo de `firestore.rules` e publique.
7. Em **Authentication → Settings → Domínios autorizados**, adicione:
   - `127.0.0.1` (se usar o Live Server)
   - `SEU_USUARIO.github.io` (se publicar no GitHub Pages)

## Como executar

O login com Google **não funciona** abrindo o arquivo direto (`file://`). Use um servidor local:

- VS Code + extensão **Live Server** → botão direito em `index.html` → *Open with Live Server*; ou
- `python -m http.server 5500` na pasta do projeto e acesse `http://localhost:5500`.

## Como testar

1. Abra `protegida.html` sem estar logado → deve redirecionar para o login.
2. Cadastre um usuário → deve entrar na área restrita mostrando nome e e-mail.
3. Clique em **Sair** → volta para o login.
4. Tente cadastrar o mesmo e-mail → `alert("Este e-mail já está cadastrado.")`.
5. Teste o **Entrar com Google**.
6. Confira a coleção `usuarios` no Firestore (`nome`, `email`, `ultimoAcesso`).

## Observação de segurança

As regras do Firestore em `firestore.rules` são **apenas para fins didáticos**. Em um sistema real, restrinja leitura e escrita por usuário autenticado e faça a checagem de duplicidade no servidor (Cloud Functions).
