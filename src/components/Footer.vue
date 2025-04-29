<template>
  <div class="bg-accent text-gray-600">
    <footer class="lg:max-w-7xl mx-auto p-4 text-center">
      <div class="w-full text-left">
        <RouterLink to="/" class="btn btn-ghost text-xl text-black">Registration</RouterLink>
      </div>
      <div class="grid grid-cols-12">
        <div class="col-span-12 lg:col-span-9 text-left">
          <p class="px-4 md:p-0 md:pl-4">本網頁用途僅作為個人展示使用，有關工商登記實際作業資訊請洽詢業界專業人士，謝謝您。</p>
          <p class="pl-4 mt-2 text-gray-500 text-xs">© 2025 Sarah. All rights reserved.</p>
        </div>
        <div class="col-span-12 pl-4 pt-4 lg:pt-0 lg:pl-0 lg:col-span-3">
          <div class="flex flex-col items-start space-y-1">
            <a href="https://github.com/sarah001160/registration" target="_blank" class="hover:text-warning">
              <i class="text-xl ri-github-fill mx-1"></i>GitHub
            </a>
            <p>
              <i class="text-xl ri-mail-line mx-1"></i>sarah00116@gmail.com
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>

</template>