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
  // 路由切换时滚动到顶部
  scrollBehavior() {
    // 滚动主内容区域到顶部
    const mainContent = document.querySelector('.main-content')
    if (mainContent) {
      mainContent.scrollTop = 0
    }
    // 同时滚动窗口到顶部（兼容处理）
    window.scrollTo(0, 0)
    return { top: 0 }
  },
})

export default router
