import {
  collection,
  doc,
  getDocs,
  getDoc,
  getFirestore,
  setDoc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { getCurrentUserUID } from './auth';
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

export const setUserName = async (uid, name) => {
  const userDoc = doc(firestore, 'users', uid);
  try {
    await updateDoc(userDoc, {
      name,
    });
    return true;
  } catch (err) {
    console.error('Error updating document', err);
    return false;
  }
};

export const setUserInfoListener = (
  listener = (doc) => {
    console.log(doc.data());
  }
) => {
  return onSnapshot(doc(firestore, 'users', getCurrentUserUID()), listener);
};

export const recordRank = async (gameId, name, score) => {
  const uid = getCurrentUserUID();
  const userRef = doc(firestore, 'users', uid);
  const rankRef = doc(firestore, 'rank', gameId);

  try {
    await Promise.all([
      updateDoc(userRef, { [gameId]: score }),
      updateDoc(rankRef, { [uid]: { name, score } }),
    ]);
    return true;
  } catch (err) {
    console.error('Error updating document', err);
    return false;
  }
};

export const fetchRank = async (gameId) => {
  const rankDoc = doc(firestore, 'rank', gameId);
  try {
    const rankSnapshot = await getDoc(rankDoc);
    const rankData = rankSnapshot.data();
    return Object.values(rankData);
  } catch (err) {
    console.error('Error reading document', err);
    return [];
  }
};
