import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Firebase yapılandırman
const firebaseConfig = {
  apiKey: "AIzaSyBXZMW-_TKap5VUvZl-8ZPHyzccgiqeuic",
  authDomain: "tobed-takip.firebaseapp.com",
  projectId: "tobed-takip",
  storageBucket: "tobed-takip.firebasestorage.app",
  messagingSenderId: "204746641914",
  appId: "1:204746641914:web:38eb335f3da4e5b5ee9443",
  measurementId: "G-D0YMGM4KK4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addUrun() {
  const model_no = document.getElementById('model_no').value;
  const seri_no = document.getElementById('seri_no').value;
  if (!model_no || !seri_no) {
    alert("Lütfen tüm alanları doldurun!");
    return;
  }
  await addDoc(collection(db, "urunler"), { model_no, seri_no });
  alert('Ürün eklendi!');
  getUrunler();
}

async function getUrunler() {
  const ul = document.getElementById('urunler');
  ul.innerHTML = '';
  const querySnapshot = await getDocs(collection(db, "urunler"));
  querySnapshot.forEach((doc) => {
    const li = document.createElement('li');
    li.textContent = `${doc.data().model_no} - ${doc.data().seri_no}`;
    ul.appendChild(li);
  });
}

getUrunler();
document.getElementById('ekleBtn').addEventListener('click', addUrun); 