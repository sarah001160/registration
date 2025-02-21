// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, getDoc, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
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
const COLLECTION_TEST02 = ref('test02');
const DOCUMENT_FOOD = ref('food'); // test02集合內的文件
const COLLECTION_USERS = ref('users');
const auth = getAuth();
const currentUser = ref(null);
// 登入test 請記得安裝dompurify
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

// 讀取 test02 集合內所有文件
const getAllDocFrTest02 = async () => {
  const data = [];
  const querySnapshot = await getDocs(collection(db, COLLECTION_TEST02.value));
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
}

const getAllDocFrUsers = async () => {
  const data = [];
  const querySnapshot = await getDocs(collection(db, COLLECTION_USERS.value));
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  })
  return data;
}

// 讀取特定文件（text02 集合內的 "food" 文件）
const getDocFood = async () => {
  const docRef = doc(db, COLLECTION_TEST02.value, DOCUMENT_FOOD.value)
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data().array;
    return data; // 獲取food文件資料
  } else {
    console.log("food 文件不存在");
  }
}

// get 應備文件列表
const getRequiredFiles = async (docName) => {
  const docRef = doc(db, COLLECTION_USERS.value, docName);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return data;
  } else {
    console.log('沒有文件')
  }
}

const addToArray = async ({ para }) => {
  const docRef = doc(db, COLLECTION_TEST02.value, DOCUMENT_FOOD.value);
  try {
    await updateDoc(docRef, {
      array: arrayUnion(para),
    });
    console.log("Items added to array!");
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

const editRequiredItem = async ({ config }) => {
  const docRef = doc(db, COLLECTION_USERS.value, config.doc);
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

// 測試移除欄位array內的資料，但不會檢查是否已經移除過了 test 待研究
const removeFromArray = async (item) => {
  console.log(item);
  const docRef = doc(db, COLLECTION_TEST02.value, DOCUMENT_FOOD.value); //指定文件路徑
  const docSnap = await getDoc(docRef);
  console.log('db, "test02", "food"是否存在?', docSnap.exists());
  try {
    await updateDoc(docRef, {
      array: arrayRemove(item), // 從陣列中移除指定物件

    });
    console.log(`物件{ id: 1, name: "test01", num: 10, restaurant: "餐廳A" }已從array中移除`);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}

export {
  db, auth, currentUser,
  getAllDocFrTest02, getDocFood, getAllDocFrUsers,
  getRequiredFiles, editRequiredItem,
  addToArray,
  removeFromArray,
  login, logout,
}