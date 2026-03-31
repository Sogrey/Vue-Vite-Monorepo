import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/sdk1',
      name: 'sdk1',
      component: () => import('../views/Sdk1View.vue'),
    },
    {
      path: '/sdk2',
      name: 'sdk2',
      component: () => import('../views/Sdk2View.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
