import { createRouter, createWebHistory } from 'vue-router';
//import { onAuthStateChanged } from 'firebase/auth';
import { auth, currentUser } from '@/stores/useFireStore';

// 你的頁面組件
import HomeView from '@/views/HomeView.vue';

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
    component: () => import('@/views/NoteView.vue')
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
  if (to.meta.requiresAuth) {
    if (currentUser.value) {
      next();
    } else {
      next({ path: '/login' });
    }
  } else {
    next();  // 不需要驗證的路由直接放行
  }
});

export default router;
