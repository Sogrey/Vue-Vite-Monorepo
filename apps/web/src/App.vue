<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <!-- 桌面端：左侧导航 -->
    <aside class="sidebar desktop-only">
      <div class="sidebar-header">
        <div class="logo">
          <span class="logo-icon">⚡</span>
          <span class="logo-text">Vue Monorepo</span>
        </div>
      </div>

      <nav class="sidebar-nav">
        <RouterLink to="/" class="nav-item">
          <span class="nav-icon">🏠</span>
          <span class="nav-text">Home</span>
        </RouterLink>
        <RouterLink to="/sdk1" class="nav-item">
          <span class="nav-icon">📦</span>
          <span class="nav-text">SDK1</span>
        </RouterLink>
        <RouterLink to="/sdk2" class="nav-item">
          <span class="nav-icon">🌐</span>
          <span class="nav-text">SDK2</span>
        </RouterLink>
        <RouterLink to="/about" class="nav-item">
          <span class="nav-icon">ℹ️</span>
          <span class="nav-text">About</span>
        </RouterLink>
      </nav>

      <div class="sidebar-footer">
        <div class="tech-badge">
          <span>Vue 3</span>
          <span>Vite</span>
          <span>Turborepo</span>
        </div>
      </div>
    </aside>

    <!-- 移动端：顶部导航 -->
    <header class="mobile-header mobile-only">
      <div class="mobile-header-content">
        <div class="logo">
          <span class="logo-icon">⚡</span>
          <span class="logo-text">Vue Monorepo</span>
        </div>
      </div>
      <nav class="mobile-nav">
        <RouterLink to="/" class="mobile-nav-item">
          <span class="nav-icon">🏠</span>
          <span class="nav-text">Home</span>
        </RouterLink>
        <RouterLink to="/sdk1" class="mobile-nav-item">
          <span class="nav-icon">📦</span>
          <span class="nav-text">SDK1</span>
        </RouterLink>
        <RouterLink to="/sdk2" class="mobile-nav-item">
          <span class="nav-icon">🌐</span>
          <span class="nav-text">SDK2</span>
        </RouterLink>
        <RouterLink to="/about" class="mobile-nav-item">
          <span class="nav-icon">ℹ️</span>
          <span class="nav-text">About</span>
        </RouterLink>
      </nav>
    </header>

    <!-- 右侧内容区 -->
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style>
/* 全局样式 - 确保所有元素使用 border-box */
* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  width: 100%;
  max-width: 100vw;
}
</style>

<style scoped>

/* 显示/隐藏控制 */
.desktop-only {
  display: flex;
}

.mobile-only {
  display: none;
}

/* ========== 桌面端：左侧导航栏 ========== */
.sidebar {
  width: 260px;
  min-width: 260px; /* 防止收缩 */
  background: rgba(10, 14, 26, 0.85); /* 半透明背景 */
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(30, 144, 255, 0.2); /* 蓝色边框 */
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.5), 0 0 30px rgba(30, 144, 255, 0.1); /* 添加蓝色光晕 */
}

.sidebar-header {
  padding: 2rem 1.5rem;
  border-bottom: 1px solid rgba(30, 144, 255, 0.15);
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon {
  font-size: 2rem;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.sidebar-nav {
  flex: 1;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  text-decoration: none;
  color: #a0aec0;
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.nav-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0;
  background: linear-gradient(90deg, rgba(102, 126, 234, 0.2) 0%, transparent 100%);
  transition: width 0.3s ease;
}

.nav-item:hover {
  color: #fff;
  background: rgba(102, 126, 234, 0.1);
}

.nav-item:hover::before {
  width: 100%;
}

.nav-item.router-link-exact-active {
  color: #fff;
  background: linear-gradient(135deg, rgba(30, 144, 255, 0.2) 0%, rgba(0, 191, 255, 0.2) 100%);
  border-left: 3px solid #1E90FF; /* 蓝色激活边框 */
}

.nav-icon {
  font-size: 1.25rem;
  z-index: 1;
}

.nav-text {
  font-weight: 500;
  font-size: 1rem;
  z-index: 1;
}

.sidebar-footer {
  padding: 1.5rem;
  border-top: 1px solid rgba(30, 144, 255, 0.15);
}

.tech-badge {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-badge span {
  background: rgba(30, 144, 255, 0.15);
  color: #87CEEB; /* 天蓝色 */
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  border: 1px solid rgba(30, 144, 255, 0.3);
}

/* ========== 桌面端：右侧内容区 ========== */
.main-content {
  flex: 1;
  margin-left: 260px;
  min-height: 100vh;
  width: 100%; /* 改为 100% 而不是 calc */
  max-width: calc(100vw - 260px); /* 添加最大宽度限制 */
  overflow-x: hidden; /* 防止横向滚动 */
  box-sizing: border-box; /* 包含 padding */
}

/* ========== 移动端：顶部导航栏 ========== */
.mobile-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(10, 14, 26, 0.85); /* 半透明背景 */
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(30, 144, 255, 0.2);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.5), 0 0 30px rgba(30, 144, 255, 0.1);
}

.mobile-header-content {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.mobile-nav {
  display: flex;
  justify-content: space-around;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.2);
}

.mobile-nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
  text-decoration: none;
  color: #a0aec0;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.mobile-nav-item:hover {
  color: #fff;
  background: rgba(102, 126, 234, 0.1);
}

.mobile-nav-item.router-link-exact-active {
  color: #1E90FF;
  background: rgba(30, 144, 255, 0.15);
}

.mobile-nav-item .nav-icon {
  font-size: 1.25rem;
}

.mobile-nav-item .nav-text {
  font-size: 0.75rem;
  font-weight: 500;
}

/* ========== 响应式断点 ========== */
@media (max-width: 768px) {
  .desktop-only {
    display: none !important;
  }

  .mobile-only {
    display: block !important;
  }

  .main-content {
    margin-left: 0;
    width: 100%;
    margin-top: 120px; /* 为顶部导航留出空间 */
  }
}

@media (max-width: 480px) {
  .mobile-header-content {
    padding: 0.75rem 1rem;
  }

  .logo-icon {
    font-size: 1.5rem;
  }

  .logo-text {
    font-size: 1rem;
  }

  .mobile-nav-item .nav-icon {
    font-size: 1rem;
  }

  .mobile-nav-item .nav-text {
    font-size: 0.7rem;
  }

  .main-content {
    margin-top: 100px;
  }
}
</style>
