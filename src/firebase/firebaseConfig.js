import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDKtzJ6Q1Q3FfEbCT2JkpgUXt_vbPxbIWo",
  authDomain: "shopping-project-87238.firebaseapp.com",
  projectId: "shopping-project-87238",
  storageBucket: "shopping-project-87238.appspot.com",
  messagingSenderId: "1093814452710",
  appId: "1:1093814452710:web:b1cc94130c83e4e8ec9627",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
const provider = new GoogleAuthProvider();
export const signUpWithGoogle = async () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
};

export const logoutFromGoogle = async () => {
  return signOut(auth)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
};
