import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) {
    loginBtn.onclick = () => {
      const email = document.getElementById('loginEmail').value;
      const pwd = document.getElementById('loginPassword').value;
      signInWithEmailAndPassword(auth, email, pwd)
        .then(() => window.location.href = 'shop.html')
        .catch(err => alert(err.message));
    };
  }

  const regBtn = document.getElementById('registerBtn');
  if (regBtn) {
    regBtn.onclick = () => {
      const email = document.getElementById('registerEmail').value;
      const pwd = document.getElementById('registerPassword').value;
      createUserWithEmailAndPassword(auth, email, pwd)
        .then(() => window.location.href = 'index.html')
        .catch(err => alert(err.message));
    };
  }
});
