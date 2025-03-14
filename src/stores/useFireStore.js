// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, getDoc, doc, updateDoc, deleteField } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import DOMPurify from "dompurify"; // JS

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBA-bBHvQmVf7IIVrqb-z8q9LQ3hLt4mgQ',
  authDomain: 'curd-firebase-store.firebaseapp.com',
  projectId: 'curd-firebase-store',
  storageBucket: 'curd-firebase-store.firebasestorage.app',
  messagingSenderId: '296344788381',
  appId: '1:296344788381:web:f3bfb5777d3e20ce936374',
  measurementId: 'G-1NQQKTYMR1',
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// 獲取 Firestore 實例
const db = getFirestore(app);
const COLLECTION_USERS = 'users';
const auth = getAuth();
let currentUser = ref(null); // 使 Vue 可以偵測變化
// 登入
const login = async (email, password) => {
  const cleanEmail = DOMPurify.sanitize(email);
  const cleanPwd = DOMPurify.sanitize(password);
  try {
    const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, cleanPwd);
    const user = userCredential.user;
    return user.emailVerified;
  } catch (error) {
    console.error('Error logging in:', error);
    return false;
  }
};

// 登出
const logout = async () => {
  try {
    await signOut(auth);
    console.log('User logged out');
  } catch (error) {
    console.error('Error logginh out:', error);
  }
};

// 監聽用戶的登入狀態變化
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser.value = user;
  } else {
    currentUser.value = null;
  }
});

// get 應備文件列表
const getRequiredFiles = async (docName) => {
  const docRef = doc(db, COLLECTION_USERS, docName);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return data;
  } else {
    console.log('沒有文件')
  }
}
// 新增或編輯應備文件
const editRequiredItem = async ({ config }) => {
  const docRef = doc(db, COLLECTION_USERS, config.doc);
  try {
    await updateDoc(docRef, {
      [config.para.id]: config.para // 屬性:值
    });
    console.log(`已更新`);
    return true;
  } catch (e) {
    console.error("更新文件發生錯誤: ", e);
    return false;
  }
}

// 刪除應備文件
const removeRequiredItem = async ({ config }) => {
  const docRef = doc(db, COLLECTION_USERS, config.doc);
  try {
    await updateDoc(docRef, {
      [config.para.id]: deleteField(), // 被移除的「欄位」名稱
    });
    console.log('已刪除');
    return true;
  } catch (e) {
    console.error('error message', e)
    return false;
  }
}

export {
  db, auth, currentUser,
  getRequiredFiles, editRequiredItem, removeRequiredItem,
  login, logout,
}