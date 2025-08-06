import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyArXMXE0JrKTURP3DsryIjfDCRIp41x_sY",
  authDomain: "github-site-a4366.firebaseapp.com",
  projectId: "github-site-a4366",
  storageBucket: "github-site-a4366.appspot.com",
  messagingSenderId: "928253879225",
  appId: "1:928253879225:web:822f4f14079a9de2facc68",
  measurementId: "G-XNPYTECHDG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
