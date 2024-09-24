import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCLuoQP0yJbqX647mAavUYU1cFscFFrifg",
  authDomain: "netflix-clone-518fb.firebaseapp.com",
  projectId: "netflix-clone-518fb",
  storageBucket: "netflix-clone-518fb.appspot.com",
  messagingSenderId: "651616770760",
  appId: "1:651616770760:web:c6232c12d8acf10ba8e3fd",
};
//initializing firebase
const app = initializeApp(firebaseConfig);
//initializing authentication
const auth = getAuth(app);
//initializing database
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};
const logout = async () => {
  signOut(auth);
};
export { auth, db, login, signup, logout };
