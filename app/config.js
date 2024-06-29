import {initializeApp} from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCo56UZzBNXUEWkq2Xazn2gbyNNnUhTgKw",
  authDomain: "vsf-2-8011b.firebaseapp.com",
  projectId: "vsf-2-8011b",
  storageBucket: "vsf-2-8011b.appspot.com",
  messagingSenderId: "1016605953597",
  appId: "1:1016605953597:web:1215b27669d7a3a3e3e454",
  measurementId: "G-345JWVE5PE"
};

const app = initializeApp(firebaseConfig);

export {app}