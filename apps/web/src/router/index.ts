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
    // 使用 setTimeout 确保 DOM 已更新，多次调用确保生效
    return new Promise((resolve) => {
      // 立即滚动
      window.scrollTo(0, 0)
      const mainContent = document.querySelector('.main-content')
      if (mainContent) {
        mainContent.scrollTop = 0
      }
      
      // 延迟再次滚动，确保覆盖其他滚动行为
      setTimeout(() => {
        window.scrollTo(0, 0)
        const mc = document.querySelector('.main-content')
        if (mc) {
          mc.scrollTop = 0
        }
        resolve({ top: 0, left: 0 })
      }, 100)
      
      // 最后一次确保
      setTimeout(() => {
        window.scrollTo(0, 0)
        const mc = document.querySelector('.main-content')
        if (mc) {
          mc.scrollTop = 0
        }
      }, 300)
    })
  },
})

export default router
