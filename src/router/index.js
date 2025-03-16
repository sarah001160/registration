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
  // 前台首頁
  {
    name: 'home',
    path: '/',
    component: HomeView,
  },
  // 前台登入
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/LoginView.vue')
  },
  // 前台應備文件
  // {
  //   name: 'webnote',
  //   path: '/webnote',
  //   component: () => import('@/views/WebNoteView.vue')
  // },
  // 後台
  {
    name: 'note',
    path: '/note',
    component: () => import('@/views/NoteView.vue'),
    meta: { requiresAuth: true }  // 需驗證 
  },
  {
    name: 'account',
    path: '/account',
    component: () => import('@/views/AccountView.vue'),
    meta: { requiresAuth: true }  // 需驗證 
  },

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
