<script setup>
import { auth } from '@/stores/useFireStore';
import { onAuthStateChanged } from 'firebase/auth';
const userEmail = ref('');

onAuthStateChanged(auth, (user) => {
  userEmail.value = user.email;
})

</script>
<template>
  <div class="p-2">
    <h1 class="text-center font-bold text-xl p-4">我的資料</h1>
    <div class="lg:max-w-xl mx-auto rounded-md border">
      <div
        class="bg-gradient-to-r from-gray-100 to-blue-50 p-6 w-full flex flex-col justify-center items-center space-y-4">
        <div class="avatar">
          <div class="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div>
          <small class="text-gray-600">名稱</small>
          <p class="font-bold text-lg mx-1">測試者一號</p>
        </div>
      </div>
      <div class="p-6 w-90 mx-auto flex flex-col items-center">
        <small class="text-gray-600">電子郵件地址</small>
        <p class="font-bold mx-1">{{ userEmail }}</p>
      </div>
    </div>
  </div>
</template>