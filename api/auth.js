import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
  updateProfile,
  signOut,
} from 'firebase/auth';
import app from './firebase';

// Get a reference to the database service
const auth = getAuth(app);
auth.languageCode = 'ko';

let authListener = null;

export const setAuthListener = (onChanged, onError) => {
  authListener = onAuthStateChanged(auth, onChanged, onError);
};
export const initAuthListener = () => {
  if (authListener) {
    authListener();
    authListener = null;
  }
};

export const loginForGuest = async () => {
  try {
    await signInAnonymously(auth);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const loginForEmail = async (email, password) => {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const user = credential.user;
  } catch (error) {
    const { code, message } = error;
    console.log(code);
  }
};

export const registerForEmail = async (email, password) => {
  try {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = credential.user;
  } catch (error) {
    const { code, message } = error;
    console.log(code);
  }
};

export const setDisplayName = async (displayName) => {
  try {
    await updateProfile(auth.currentUser, {
      displayName,
    });
  } catch (error) {
    const { code, message } = error;
    console.log(code);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
