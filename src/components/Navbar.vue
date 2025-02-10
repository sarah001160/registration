<script setup></script>
<template>
  <div class="navbar bg-gray-100">
    <div class="flex-none">
      <div class="drawer">
        <input id="my-drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
          <!-- Page content here -->
          <label for="my-drawer" class="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              class="inline-block h-5 w-5 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </label>
        </div>
        <div class="drawer-side">
          <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
          <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            <!-- Sidebar content here 側邊 -->
            <li>
              <RouterLink to="/data" :class="{ 'text-blue-500 rounded-md': $route.path == '/data' }">
                口袋餐廳</RouterLink>
            </li>
            <li>
              <RouterLink to="/note" :class="{ 'text-blue-500 rounded-md': $route.path == '/note' }">筆記區</RouterLink>
            </li>
            <li><a href="">案件歸倉</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="flex-1">
      <RouterLink to="/" class="btn btn-ghost text-xl">LOGO</RouterLink>
    </div>
    <div class="flex-none">
      <button class="px-1 btn btn-square btn-ghost">
        <RouterLink to="/login">登入</RouterLink>
      </button>
      <button class="btn btn-square btn-ghost">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          class="inline-block h-5 w-5 stroke-current">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z">
          </path>
        </svg>
      </button>
    </div>
  </div>
</template>
<style lang="sass" scoped>
ul 
  li
    @apply mb-1
</style>