import { createRouter, createWebHistory } from 'vue-router';

// 你的頁面組件
import HomeView from '@/views/HomeView.vue';

// 定義路由
const routes = [
  {
    name: 'home',
    path: '/',
    component: HomeView
  },
  {
    name: 'data',
    path: '/data',
    component: () => import('@/views/DataView.vue')
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

export default router;
