/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // sign up
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //login
  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   sign out
  const logOut = () => {
    return signOut(auth);
  };

  //   google login
  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // observer
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  const authentication = {
    signUp,
    logIn,
    logOut,
    googleLogin,
  };
  console.log(user);

  return (
    <AuthContext.Provider value={authentication}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
