<script setup>
import { currentUser, logout } from '@/stores/useFireStore';
import { useRouter } from 'vue-router'; // 引入 useRouter
import { useUserStore } from '@/stores/useUserStore'; // 共享狀態
const router = useRouter(); // 建立 router 實例
const useUser = useUserStore(); // 共享狀態
const handleLogout = async () => {
  await logout();
  await router.push({ name: 'home' });
}
</script>
<template>
  <div class="bg-gray-100 relative z-50 text-gray-600">
    <div class="navbar w-full lg:max-w-7xl lg:mx-auto">
      <div class="flex-none">
        <div class="drawer">
          <input id="my-drawer" type="checkbox" class="drawer-toggle" />
          <div class="drawer-content">
            <!-- Page content here -->
            <label for="my-drawer" class="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                class="inline-block h-5 w-5 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16">
                </path>
              </svg>
            </label>
          </div>
          <div class="drawer-side">
            <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
            <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              <!-- Sidebar content here 側邊 -->
              <li v-if="!currentUser">
                <RouterLink to="/webnote" :class="{ 'text-blue-500 rounded-md': $route.path == '/data' }">
                  ▪️應備文件</RouterLink>
              </li>
              <li v-if="currentUser">
                <RouterLink to="/note" :class="{ 'text-blue-500 rounded-md': $route.path == '/note' }">🔹應備文件 (後台編輯)
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="flex-1">
        <RouterLink to="/" class="btn btn-ghost text-xl text-black">Registration</RouterLink>
      </div>
      <div class="flex-none">
        <button v-if="!currentUser" class="px-1 btn btn-square btn-ghost">
          <RouterLink to="/login">登入</RouterLink>
        </button>
        <div v-else class="flex gap-2 items-center">
          <small v-if="useUser.userName" class="hidden lg:block">您好，{{ useUser.userName }}</small>
          <small v-else class="hidden lg:block">您好，{{ useUser.userEmail }}</small>
          <button @click="handleLogout" class="px-1 btn btn-square btn-ghost">
            登出
          </button>
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn m-1 bnt-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                class="inline-block h-5 w-5 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z">
                </path>
              </svg>
            </div>
            <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-1 w-40 p-2 shadow-sm">
              <li>
                <RouterLink to="/mydata">
                  <div class="avatar">
                    <div class="w-10 rounded-full">
                      <img v-if="useUser.userPhoto" :src="useUser.userPhoto" alt="大頭貼">
                      <img v-else src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                  </div>
                  我的資料
                </RouterLink>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="sass" scoped>
ul 
  li
    @apply mb-1
</style>