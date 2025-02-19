import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '@/stores/useFireStore';
import { onAuthStateChanged } from 'firebase/auth';
// 你的頁面組件
import HomeView from '@/views/HomeView.vue';

let currentUser = ref(null);
const checkAuthState = () => {
  return new Promise((resolve) => {
    if (currentUser.value !== null) {
      resolve(currentUser.value);
    } else {
      onAuthStateChanged(auth, (user) => {
        currentUser.value = user;  // 若回傳 null 表示未登入
        resolve(user);
      });
    }
  })
}

// 定義路由
const routes = [
  {
    name: 'home',
    path: '/',
    component: HomeView,
  },
  {
    name: 'data',
    path: '/data',
    component: () => import('@/views/DataView.vue'),
    meta: { requiresAuth: true }  // 需驗證 
  },
  {
    name: 'note',
    path: '/note',
    component: () => import('@/views/NoteView.vue'),
    meta: { requiresAuth: true }  // 需驗證 
  },
  // login 前台
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/LoginView.vue')
  }
];

// 創建路由實例
const router = createRouter({
  history: createWebHistory('/registration/'),
  routes, // 路由配置
});

// 路由守衛
router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) {
    next(); // 不需要驗證的路由直接放行
  } else {
    checkAuthState().then((user) => {
      if (user) {
        next(); // 用戶已登入，放行
      } else { // 未登入，導向登入頁
        next({ path: '/login' })
      }
    });
  }
});

export default router;
