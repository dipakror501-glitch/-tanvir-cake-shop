// Firebase web config for TANVIR-CAKE-SHOP.
// This config is intended to be public in a browser app. Protect data with Firebase Security Rules.
const firebaseConfig = {
  apiKey: "AIzaSyAMkSOgz6eSH-20Z7-GtPBFN3bFPMggkrc",
  authDomain: "tanvir-cake-shop.firebaseapp.com",
  databaseURL: "https://tanvir-cake-shop-default-rtdb.firebaseio.com",
  projectId: "tanvir-cake-shop",
  storageBucket: "tanvir-cake-shop.firebasestorage.app",
  messagingSenderId: "833948689071",
  appId: "1:833948689071:web:6984126dfb553c39f82a5a"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();
