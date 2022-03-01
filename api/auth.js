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
import { addUser } from './database';

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
    await signInWithEmailAndPassword(auth, email, password);
    return {
      success: true,
    };
  } catch (error) {
    let { code } = error;
    code = code.split('/')[1];
    let errorMessage = '로그인 오류';
    if (code === 'wrong-password') {
      errorMessage = '비밀번호가 일치하지 않습니다';
    } else if (code === 'user-not-found') {
      errorMessage = '등록되지 않은 이메일입니다';
    } else if (code === 'invalid-email') {
      errorMessage = '이메일 형식을 확인해주세요';
    } else if (code === 'user-disabled') {
      errorMessage = '사용 불가능한 계정입니다';
    }
    return {
      success: false,
      message: errorMessage,
    };
  }
};

export const registerForEmail = async (email, password, name) => {
  try {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = credential.user;
    await Promise.all([
      updateProfile(user, { displayName: name }),
      addUser(user.uid, name),
    ]);
    return {
      success: true,
    };
  } catch (error) {
    let { code } = error;
    code = code.split('/')[1];
    let errorMessage = '회원가입 오류';
    if (code === 'email-already-in-use') {
      errorMessage = '이미 가입한 이메일입니다';
    } else if (code === 'invalid-email') {
      errorMessage = '이메일 형식을 확인해주세요';
    } else if (code === 'operation-not-allowed') {
      errorMessage = '등록 불가능한 이메일입니다';
    } else if (code === 'weak-password') {
      errorMessage = '비밀번호가 너무 단순합니다';
    }
    return {
      success: false,
      message: errorMessage,
    };
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
