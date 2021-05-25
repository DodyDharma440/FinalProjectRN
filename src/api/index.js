import * as firebase from "firebase";

export const signUp = (inputValue) => {
  const { email, password } = inputValue;

  return firebase.auth().createUserWithEmailAndPassword(email, password);
};

export const signIn = (inputValue, cb) => {
  const { email, password } = inputValue;

  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const logout = () => {
  return firebase.auth().signOut();
};
