<script setup>
import { onAuthStateChanged, getAuth, updateProfile } from 'firebase/auth';
import _ from 'lodash';
import Swal from 'sweetalert2';
const auth = getAuth();
const user = auth.currentUser;
const userEmail = ref('');
const userName = ref('');
const tempUserName = ref('');//編輯名稱
const userPhoto = ref('');
let lastSignInTime = ref('');
const isEdit = ref(false);

onAuthStateChanged(auth, (user) => {
  userEmail.value = user.email; // 電子郵件
  userName.value = user.displayName; // 名稱
  userPhoto.value = user.photoURL; // 照片
  lastSignInTime = formateStringtoDate(user.metadata.lastSignInTime); // 上次登入時間
});

// 編輯test
function handleEdit() {
  isEdit.value = true;
  tempUserName.value = userName.value;
}
function updateEditName() {
  // 防呆
  if (_.isEmpty(tempUserName.value.trim())) {
    Swal.fire({
      icon: 'warning',
      title: '名稱不得空白!',
      confirmButtonText: '確認',
      confirmButtonColor: '#3B82F6'
    });
    isEdit.value = false;
    return;
  }

  if (auth.currentUser && !_.isEmpty(tempUserName.value)) {
    // 更新
    updateProfile(auth.currentUser, {
      displayName: tempUserName.value,
    }).then(() => {
      console.log('Profile updated!')
      // 刷新
      auth.currentUser.reload().then(() => {
        userName.value = auth.currentUser.displayName;
      });
      Swal.fire({
        icon: 'success',
        title: '名稱更新成功!',
        confirmButtonText: '確認',
        confirmButtonColor: '#3B82F6'
      });
    }).catch((error) => {
      console.log(' An error occurred', error)
      Swal.fire({
        icon: 'warning',
        title: error,
        confirmButtonText: '確認',
        confirmButtonColor: '#3B82F6'
      });
    });
  } else {
    console.log('未登入或帳號有問題')
  }
  isEdit.value = false;
}

// 字串轉日期 Date
function formateStringtoDate(dateStr) {
  // dateStr 是原始日期字串
  // 將字串轉換為 Date 物件
  const date = new Date(dateStr);

  // 轉換為中文格式
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    // timeZoneName: 'short', // 不顯示時區
  };

  const formattedDate = date.toLocaleDateString('zh-TW', options);
  return formattedDate; // 例如：2025年3月18日 星期二 07:20:42 GMT
}


</script>
<template>
  <div class="p-2">
    <h1 class="text-center font-bold text-xl p-4">我的資料</h1>
    <div class="lg:max-w-xl mx-auto rounded-md border">
      <div
        class="bg-gradient-to-r from-gray-100 to-blue-50 p-6 w-full flex flex-col justify-center items-center space-y-4">
        <div class="avatar">
          <div class="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
            <img v-if="userPhoto" :src="userPhoto" />
            <img v-else src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div>
          <small class="text-gray-600">名稱</small>
          <!--編輯-->
          <div v-if="isEdit">
            <label class="form-control w-full max-w-xs">
              <input type="text" v-model="tempUserName" placeholder="請輸入名稱"
                class="input input-bordered w-full max-w-xs" />
              <div class="label">
                <button class="btn" @click="isEdit = !isEdit">取消</button>
                <button class="btn btn-primary" @click="updateEditName">更新</button>
              </div>
            </label>
          </div>
          <!--閱讀-->
          <div v-else class="flex">
            <p v-if="userName" class="font-bold text-lg mx-1">{{ userName }}</p>
            <p v-else>尚未命名</p>
            <button @click="handleEdit"><i class="ri-pencil-line mx-1"></i></button>
          </div>
          <small class="text-red-500 p-2 mx-auto">※目前不開放更換圖片</small>
        </div>

      </div>
      <div class="p-6 w-90 mx-auto">
        <div>
          <small class="text-gray-600">電子郵件地址</small>
          <p class="font-bold mx-1">{{ userEmail }}</p>
        </div>
      </div>
      <small class="p-4 flex justify-center">上次登入時間: {{ lastSignInTime }}</small>
    </div>
  </div>
</template>