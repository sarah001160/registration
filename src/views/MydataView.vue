<script setup>
import { useUserStore } from '@/stores/useUserStore';
import _ from 'lodash';
import Swal from 'sweetalert2';
const useUser = useUserStore(); // 共享狀態
const tempUserName = ref(''); // 編輯名稱(新)
const isEdit = ref(false); // 是否開放編輯

// 編輯名稱
function handleEdit() {
  isEdit.value = true;
  tempUserName.value = useUser.userName; //test
}
// 更新名稱、更新到共享狀態 useUserStore
async function updateEditName() {
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

  // 更新名稱(共享狀態)
  if (!_.isEmpty(tempUserName.value)) {
    await useUser.updateUserName(tempUserName.value);
  }
  isEdit.value = false;
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
            <img v-if="useUser.userPhoto" :src="useUser.userPhoto" />
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
            <p v-if="useUser.userName" class="font-bold text-lg mx-1">{{ useUser.userName }}</p>
            <p v-else>尚未命名</p>
            <button @click="handleEdit"><i class="ri-pencil-line mx-1"></i></button>
          </div>
          <small class="text-red-500 p-2 mx-auto">※目前不開放更換圖片</small>
        </div>

      </div>
      <div class="p-6 w-90 mx-auto">
        <div>
          <small class="text-gray-600">電子郵件地址</small>
          <p class="font-bold mx-1">{{ useUser.userEmail }}</p>
        </div>
      </div>
      <small class="p-4 flex justify-center">上次登入時間: {{ useUser.lastSignInTime }}</small>
    </div>
  </div>
</template>