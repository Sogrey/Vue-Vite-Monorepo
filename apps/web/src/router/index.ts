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
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    // 使用 setTimeout 确保 DOM 已更新
    return new Promise((resolve) => {
      setTimeout(() => {
        // 滚动 window 到顶部
        window.scrollTo(0, 0)
        // 滚动 .main-content 到顶部（如果有该元素）
        const mainContent = document.querySelector('.main-content')
        if (mainContent) {
          mainContent.scrollTop = 0
        }
        // 滚动所有可能的滚动容器到顶部
        const scrollableElements = document.querySelectorAll('[style*="overflow-y: auto"], [style*="overflow: auto"], .scroll-container')
        scrollableElements.forEach(el => {
          ;(el as HTMLElement).scrollTop = 0
        })
        resolve({ top: 0, left: 0 })
      }, 100)
    })
  },
})

export default router
