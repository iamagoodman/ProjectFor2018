import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/views/auth/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/Login.vue')
  },
  {
    path: '/mock',
    name: 'Mock',
    component: () => import('@/views/mock/Index.vue')
  },
  {
    path: '/mock/detail',
    name: 'MockDetail',
    props: true,
    component: () => import('@/views/mock/Detail.vue')
  },
  {
    path: '/mock/edit',
    name: 'MockEdit',
    props: true,
    component: () => import('@/views/mock/Edit.vue')
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/auth/403.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/auth/404.vue')
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404'
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
