import {
  collection,
  doc,
  getDocs,
  getDoc,
  getFirestore,
  setDoc,
} from 'firebase/firestore';
import app from './firebase';

const firestore = getFirestore(app);

export const addUser = async (uid, name) => {
  try {
    const docRef = doc(firestore, 'users', uid);
    await setDoc(docRef, {
      name,
    });
    return true;
  } catch (err) {
    console.error('Error adding document', err);
    return false;
  }
};

export const getUserInfo = async (uid) => {
  const userDoc = doc(firestore, 'users', uid);
  const userSnapshot = await getDoc(userDoc);
  const userInfo = userSnapshot.data();
  return userInfo;
};
