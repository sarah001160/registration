// 封裝可重複使用的
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';//test
// collection 指定文件路徑
// addDoc 新增文件
// updateDoc 更新部分資料
// getDocs 取所有文件
// getDoc 取一個文件
// 指定集合>文件內的某個 array 並新增資料會使用到的: arrayUnion

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const analytics = getAnalytics(app);
console.log('analytics', analytics);

// 獲取 Firestore 實例
const db = getFirestore(app);
const COLLECTION_TEST02 = ref('test02'); // 集合
const DOCUMENT_FOOD = ref('food'); // test02集合內的文件
const COLLECTION_USERS = ref('users'); // 集合
const DOCUMENT_NOTES = ref('notes'); // users集合內的文件
const DOC_RegistrationInfo = ref('registrationInfo'); // users集合內的文件
const auth = getAuth();
const currentUser = ref(null); // 用戶狀態
// 登入test 請記得安裝dompurify
const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
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
    currentUser.value = user;  // 用戶是否已登入(email是否已驗證)
  } else {
    currentUser.value = null;  // 用戶未登入，設為 null
  }
});

// 制式寫法 https://firebase.google.com/docs/firestore/quickstart?authuser=0&hl=zh#web_8
// 讀取 test02 集合內所有文件
const getAllDocFrTest02 = async () => {
  const data = [];
  const querySnapshot = await getDocs(collection(db, COLLECTION_TEST02.value)); // (db, 集合or表的名字)
  querySnapshot.forEach((doc) => {
    data.push(doc.data()); // doc.data()是個函式
    //console.log(`${doc.id} => ${doc.data()}`);
  });
  return data;
}

const getAllDocFrUsers = async () => {
  const data = [];
  const querySnapshot = await getDocs(collection(db, COLLECTION_USERS.value)); // (db, 集合or表的名字)
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  })
  return data;
}

// 讀取特定文件（text02 集合內的 "food" 文件）
const getDocFood = async () => {
  const docRef = doc(db, COLLECTION_TEST02.value, DOCUMENT_FOOD.value) // db、指定集合、文件
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data().array;
    return data; // 獲取food文件資料
  } else {
    console.log("food 文件不存在");
  }
}

// 讀取users內的notes文件
const getDocNote = async () => {
  const docRef = doc(db, COLLECTION_USERS.value, DOCUMENT_NOTES.value) // db、指定集合、文件
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data().contentList;
    return data;
  } else {
    console.log("food 文件不存在");
  }
}

// get users 集合 / registrationInfo 文件 / coLtd 資料
// 可能要改成 動態決定取哪張文件 不寫死
const getCoLtdRequiredFiles = async (docName) => {
  const docRef = doc(db, COLLECTION_USERS.value, docName);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return data;
  } else {
    console.log('沒有coLtd文件')
  }
}

// 如要更新文件的部分欄位，但不覆寫整個文件，請使用下列特定語言的 update() 方法：
const addToArray = async ({ para }) => {
  const docRef = doc(db, COLLECTION_TEST02.value, DOCUMENT_FOOD.value); // 指定文件路徑: test02 集合名稱、food 文件名稱
  try {
    await updateDoc(docRef, {
      //items: arrayUnion("新增測試", "item"), // 新增值到陣列
      //假如 db 內的 test02 文件的 food 集合內沒有 items 屬性，這個語法會使 db 幫妳新增此筆資料
      //假如 db 內的 test02 文件的 food 集合內已經有 items 屬性了，你又再給一樣的資料， db 不會新增喔
      array: arrayUnion(para), // 新增物件到屬性 array
    });
    console.log("Items added to array!");
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

// 新增到users集合內note文件內的contentList陣列
const addToContentList = async ({ para }) => {
  const docRef = doc(db, COLLECTION_USERS.value, DOCUMENT_NOTES.value);
  try {
    await updateDoc(docRef, {
      contentList: arrayUnion(para),
    });
    console.log("Item added to contentList!");
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}

// 新增至集合 users > 文件 coLtd 內 > 欄位
// updateDoc會自動判斷，已存在的欄位他會幫你更新異動的值、不存在的欄位他會幫妳新增欄位
const addToCoLtdRequiredItem = async ({ config }) => {
  const docRef = doc(db, COLLECTION_USERS.value, config.doc);
  try {
    await updateDoc(docRef, {
      [config.para.id]: config.para // 屬性:值
    });
    console.log("已新增至coLtd");
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}
// 更新文件 coLtd
const editCoLtdRequiredItem = async ({ config }) => {
  const docRef = doc(db, COLLECTION_USERS.value, config.doc);
  try {
    await updateDoc(docRef, {
      [config.para.id]: config.para // 屬性:值
    });
    console.log(`已更新至coLtd-${config.para.id}`);
    return true;
  } catch (e) {
    console.error("更新文件發生錯誤: ", e);
    return false;
  }
}


// 測試新增文件 (OK)
// addDoc() Add a new document with a generated id.
const addNewFile = async () => {
  try {
    // 新增文件到 cities 的集合內
    const docRef = await addDoc(collection(db, "cities"), {
      name: "Tokyo",
      country: "Japan"
    });
    console.log("新增文件了 ID 是: ", docRef.id);
    // 查看集合
    const citiesFile = await getDocs(collection(db, "cities"));
    citiesFile.forEach((doc) => {
      const data = doc.data();
      console.log('cities表', data);
    });

  } catch (err) {
    console.error(err);
  }
}

// //測試移除欄位array內的資料，但不會檢查是否已經移除過了 test 待研究
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
  getAllDocFrTest02, getDocFood, getAllDocFrUsers, getDocNote,
  getCoLtdRequiredFiles, addToCoLtdRequiredItem, editCoLtdRequiredItem,
  addToArray, addNewFile, addToContentList,
  removeFromArray,
  login, logout,
}