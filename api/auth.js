import {
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  signOut,
} from 'firebase/auth';
import app from './firebase';

// Get a reference to the database service
const auth = getAuth(app);

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
    const result = await signInAnonymously(auth);
    return true;
  } catch (err) {
    console.log(err);
    return false;
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
