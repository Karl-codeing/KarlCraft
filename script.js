import { auth } from './firebase-config.js';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// Login
const loginBtn = document.getElementById('loginBtn');
if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    signInWithEmailAndPassword(auth, email, password)
      .then(() => window.location.href = 'shop.html')
      .catch(err => alert(err.message));
  });
}

// Register
const registerBtn = document.getElementById('registerBtn');
if (registerBtn) {
  registerBtn.addEventListener('click', () => {
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => window.location.href = 'index.html')
      .catch(err => alert(err.message));
  });
}
