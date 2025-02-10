<script setup>
import { login } from '@/stores/useFireStore';
const email = ref('');
const pwd = ref('');
let isPwd = ref(true); // true 密碼、false 文字
const loginSubmit = () => {
  login(email.value, pwd.value);//test
  // test todo 要記得跳轉網址
}
const togglePwd = () => {
  isPwd.value = !isPwd.value;
}

// 切換 pwd eye
</script>
<template>
  <div>
    <section class="grid grid-cols-12 rounded-md h-0 lg:h-full bg-gray-50">
      <!--左側-->
      <div class="col-span-12 lg:col-span-7 lg:p-2 rounded-md h-[20vh] md:h-[90vh] rounded-r-md overflow-hidden">
        <!--測試-->
        <img src="https://picsum.photos/id/517/800/600" alt="Sample Image" loading="lazy"
          class="responsive-img w-full h-full object-cover rounded-md" />
      </div>
      <!--右側-->
      <div class="col-span-12 lg:col-span-5 flex flex-col justify-center items-center p-6 lg:p-0">
        <div class="space-y-4">
          <div class="text-center font-bold text-xl">登入</div>

          <div>
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Email</span>
              </div>
              <input type="text" placeholder="" v-model="email" class="input input-bordered w-full" />
            </label>
            <label class="form-control w-full">
              <div class="label">
                <!--test 要加入眼睛開關功能-->
                <span class="label-text">密碼</span>
              </div>
              <label class="input input-bordered flex items-center gap-2">
                <input :type="isPwd ? 'password' : 'text'" class="grow" v-model="pwd" />
                <svg v-if="isPwd" @click="togglePwd" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                  fill="currentColor" class="h-6 w-6 cursor-pointer">
                  <path
                    d="M12 4.5C7.305 4.5 3.27 7.55 1.5 12c1.77 4.45 5.805 7.5 10.5 7.5s8.73-3.05 10.5-7.5c-1.77-4.45-5.805-7.5-10.5-7.5zm0 13c-3.038 0-5.5-2.462-5.5-5.5S8.962 6.5 12 6.5s5.5 2.462 5.5 5.5-2.462 5.5-5.5 5.5zm0-9c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zM12 9.5c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5z" />
                  <path
                    d="M12 6.5c-3.038 0-5.5 2.462-5.5 5.5s2.462 5.5 5.5 5.5 5.5-2.462 5.5-5.5-2.462-5.5-5.5-5.5zm0 9c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
                </svg>
                <svg v-else @click="togglePwd" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                  fill="currentColor" class="h-6 w-6 cursor-pointer">
                  <path
                    d="M12 4.5C7.305 4.5 3.27 7.55 1.5 12c1.77 4.45 5.805 7.5 10.5 7.5s8.73-3.05 10.5-7.5c-1.77-4.45-5.805-7.5-10.5-7.5zm0 13c-3.038 0-5.5-2.462-5.5-5.5S8.962 6.5 12 6.5s5.5 2.462 5.5 5.5-2.462 5.5-5.5 5.5zm0-9c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5z" />
                </svg>
              </label>
            </label>
            <button class="mt-8 btn btn-wide  btn-outline btn-primary" @click="loginSubmit">登入</button>

          </div>

        </div>
      </div>
    </section>
  </div>
</template>