<script setup lang="ts">
import { ref } from 'vue'

const techStack = ref([
  { name: 'Vue 3', icon: '💚', desc: '渐进式 JavaScript 框架', version: '3.4.x' },
  { name: 'Vite', icon: '⚡', desc: '下一代前端构建工具', version: '5.x' },
  { name: 'TypeScript', icon: '📘', desc: 'JavaScript 的超集', version: '5.x' },
  { name: 'Turborepo', icon: '🚀', desc: '高性能 Monorepo 构建系统', version: '2.x' },
  { name: 'pnpm', icon: '📦', desc: '快速、节省磁盘空间的包管理器', version: '10.x' },
  { name: 'ESLint', icon: '✨', desc: '代码质量检查工具', version: '9.x' }
])

const features = ref([
  {
    icon: '🏗️',
    title: 'Monorepo 架构',
    desc: '使用 Turborepo 管理多个包，共享依赖和配置'
  },
  {
    icon: '📦',
    title: 'SDK 封装',
    desc: '封装常用工具函数和 API 请求，提高代码复用性'
  },
  {
    icon: '⚡',
    title: '极速构建',
    desc: 'Vite 毫秒级热更新，Turborepo 智能缓存加速'
  },
  {
    icon: '🎯',
    title: '类型安全',
    desc: 'TypeScript 全栈类型支持，减少运行时错误'
  },
  {
    icon: '🔧',
    title: '现代化配置',
    desc: 'ESLint + Prettier 代码规范，Git Hooks 自动检查'
  },
  {
    icon: '🚀',
    title: 'CI/CD 集成',
    desc: 'GitHub Actions 自动化构建、测试和部署'
  }
])

const stats = ref([
  { label: '构建缓存加速', value: '63x', icon: '⚡' },
  { label: '项目结构', value: 'Monorepo', icon: '🏗️' },
  { label: '包管理器', value: 'pnpm', icon: '📦' },
  { label: '代码质量', value: 'A+', icon: '✨' }
])
</script>

<template>
  <div class="about-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <h1 class="page-title">
        <span class="title-icon">💡</span>
        <span class="title-text">关于项目</span>
      </h1>
      <p class="page-subtitle">Vue + Vite + Turborepo 现代化 Monorepo 模板</p>
    </div>

    <!-- 内容区域 -->
    <div class="content-wrapper">
      <!-- 项目简介 -->
      <section class="about-card">
        <div class="card-header">
          <span class="header-icon">📖</span>
          <h2>项目简介</h2>
        </div>
        <div class="card-body">
          <p class="intro-text">
            这是一个基于 <strong>Vue 3 + Vite + Turborepo</strong> 构建的现代化 Monorepo 项目模板。
            旨在为开发者提供一个开箱即用的、高性能的、可扩展的项目架构。
          </p>
          <p class="intro-text">
            项目采用 <strong>pnpm workspace</strong> 管理依赖，<strong>Turborepo</strong> 优化构建流程，
            支持<strong>智能缓存</strong>和<strong>并行构建</strong>，大幅提升开发效率。
          </p>
        </div>
      </section>

      <!-- 项目统计 -->
      <section class="stats-section">
        <div class="stats-grid">
          <div v-for="stat in stats" :key="stat.label" class="stat-card">
            <div class="stat-icon">{{ stat.icon }}</div>
            <div class="stat-value">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </section>

      <!-- 技术栈 -->
      <section class="about-card">
        <div class="card-header">
          <span class="header-icon">🛠️</span>
          <h2>技术栈</h2>
        </div>
        <div class="card-body">
          <div class="tech-grid">
            <div v-for="tech in techStack" :key="tech.name" class="tech-item">
              <div class="tech-icon">{{ tech.icon }}</div>
              <div class="tech-info">
                <h3>
                  {{ tech.name }}
                  <span class="version">{{ tech.version }}</span>
                </h3>
                <p>{{ tech.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 核心特性 -->
      <section class="about-card">
        <div class="card-header">
          <span class="header-icon">✨</span>
          <h2>核心特性</h2>
        </div>
        <div class="card-body">
          <div class="features-grid">
            <div v-for="feature in features" :key="feature.title" class="feature-item">
              <div class="feature-icon">{{ feature.icon }}</div>
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 项目结构 -->
      <section class="about-card">
        <div class="card-header">
          <span class="header-icon">📁</span>
          <h2>项目结构</h2>
        </div>
        <div class="card-body">
          <div class="structure-code">
            <pre>
Vue-Vite-Monorepo/
├── apps/                    # 应用目录
│   └── web/                # Web 应用
│       ├── src/
│       ├── public/
│       └── package.json
├── packages/               # 包目录
│   ├── sdk1/              # 工具函数库
│   └── sdk2/              # API 封装库
├── docs/                   # 文档目录
├── scripts/               # 脚本目录
├── turbo.json            # Turborepo 配置
├── pnpm-workspace.yaml   # pnpm workspace 配置
└── package.json          # 根 package.json
            </pre>
          </div>
        </div>
      </section>

      <!-- 快速开始 -->
      <section class="about-card">
        <div class="card-header">
          <span class="header-icon">🚀</span>
          <h2>快速开始</h2>
        </div>
        <div class="card-body">
          <div class="commands">
            <div class="command-item">
              <div class="cmd-label">安装依赖</div>
              <code>pnpm install</code>
            </div>
            <div class="command-item">
              <div class="cmd-label">启动开发服务器</div>
              <code>pnpm dev</code>
            </div>
            <div class="command-item">
              <div class="cmd-label">构建项目</div>
              <code>pnpm build</code>
            </div>
            <div class="command-item">
              <div class="cmd-label">代码检查</div>
              <code>pnpm lint</code>
            </div>
          </div>
        </div>
      </section>

      <!-- 作者信息 -->
      <section class="about-card">
        <div class="card-header">
          <span class="header-icon">👨‍💻</span>
          <h2>关于作者</h2>
        </div>
        <div class="card-body">
          <div class="author-content">
            <div class="author-avatar">👨‍💻</div>
            <div class="author-info">
              <h3>Sogrey</h3>
              <p>全栈开发者，热爱开源，专注于现代 Web 技术栈</p>
              <div class="author-links">
                <a href="https://github.com/Sogrey" target="_blank" class="author-link">
                  <span>GitHub</span>
                  <span class="link-arrow">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  min-height: 100vh;
  padding: 0;
}

/* 页面头部 */
.page-header {
  padding: 3rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.page-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 0.75rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.title-icon {
  font-size: 2.5rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.page-subtitle {
  font-size: 1.1rem;
  color: #a0aec0;
  margin: 0;
  letter-spacing: 1px;
}

/* 内容区域 - 铺满 */
.content-wrapper {
  padding: 2rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.about-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.about-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 48px rgba(102, 126, 234, 0.3);
  border-color: rgba(102, 126, 234, 0.3);
}

.card-header {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.header-icon {
  font-size: 2rem;
}

.card-header h2 {
  color: white;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.card-body {
  padding: 2rem;
}

.intro-text {
  color: #cbd5e0;
  line-height: 1.8;
  margin: 0 0 1rem 0;
  font-size: 1.05rem;
}

.intro-text:last-child {
  margin-bottom: 0;
}

.intro-text strong {
  color: #667eea;
  font-weight: 600;
}

/* 统计卡片 */
.stats-section {
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  border-color: rgba(102, 126, 234, 0.5);
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
}

.stat-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #a0aec0;
  font-size: 1rem;
  font-weight: 500;
}

/* 技术栈网格 */
.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: 1.5rem;
}

.tech-item {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  gap: 1rem;
  transition: all 0.3s ease;
}

.tech-item:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(102, 126, 234, 0.5);
  transform: translateX(5px);
}

.tech-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
}

.tech-info h3 {
  color: white;
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.version {
  font-size: 0.8rem;
  color: #667eea;
  background: rgba(102, 126, 234, 0.2);
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-weight: 500;
}

.tech-info p {
  color: #a0aec0;
  margin: 0;
  font-size: 0.95rem;
}

/* 特性网格 */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: 1.5rem;
}

.feature-item {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.feature-item:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(102, 126, 234, 0.5);
  transform: translateY(-3px);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.feature-item h3 {
  color: white;
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.feature-item p {
  color: #a0aec0;
  margin: 0;
  line-height: 1.6;
}

/* 结构代码 */
.structure-code pre {
  background: rgba(0, 0, 0, 0.3);
  color: #a0aec0;
  padding: 1.5rem;
  border-radius: 12px;
  overflow-x: auto;
  font-size: 0.9rem;
  line-height: 1.8;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin: 0;
  font-family: 'Courier New', monospace;
}

/* 命令列表 */
.commands {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
  gap: 1.5rem;
}

.command-item {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.command-item:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(102, 126, 234, 0.5);
}

.cmd-label {
  color: #a0aec0;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.command-item code {
  background: rgba(102, 126, 234, 0.2);
  color: #f093fb;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  font-size: 1rem;
  display: block;
  border: 1px solid rgba(102, 126, 234, 0.3);
}

/* 作者信息 */
.author-content {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.author-avatar {
  font-size: 4rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(102, 126, 234, 0.5);
  flex-shrink: 0;
}

.author-info h3 {
  color: white;
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.author-info p {
  color: #a0aec0;
  margin: 0 0 1rem 0;
  line-height: 1.6;
}

.author-links {
  display: flex;
  gap: 1rem;
}

.author-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.author-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.link-arrow {
  transition: transform 0.3s ease;
}

.author-link:hover .link-arrow {
  transform: translateX(5px);
}

/* 响应式 - 平板 */
@media (max-width: 1024px) {
  .page-header {
    padding: 2rem;
  }

  .content-wrapper {
    padding: 1.5rem 2rem;
  }

  .tech-grid,
  .features-grid,
  .commands {
    grid-template-columns: 1fr;
  }
}

/* 响应式 - 移动端 */
@media (max-width: 768px) {
  .page-header {
    padding: 1.5rem;
  }

  .page-title {
    font-size: 1.75rem;
  }

  .title-icon {
    font-size: 1.75rem;
  }

  .content-wrapper {
    padding: 1rem;
    gap: 1rem;
  }

  .card-header {
    padding: 1rem 1.5rem;
  }

  .card-body {
    padding: 1.5rem;
  }

  .tech-grid,
  .features-grid,
  .commands {
    grid-template-columns: 1fr;
  }

  .author-content {
    flex-direction: column;
    text-align: center;
  }

  .author-avatar {
    width: 80px;
    height: 80px;
    font-size: 3rem;
  }

  .author-links {
    justify-content: center;
  }
}

/* 超小屏幕 */
@media (max-width: 480px) {
  .page-header {
    padding: 1rem;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .title-icon {
    font-size: 1.5rem;
  }

  .page-subtitle {
    font-size: 0.9rem;
  }

  .content-wrapper {
    padding: 0.75rem;
  }

  .card-header {
    padding: 1rem;
    flex-direction: column;
    align-items: flex-start;
  }

  .card-header h2 {
    font-size: 1.2rem;
  }

  .card-body {
    padding: 1rem;
  }

  .intro-text {
    font-size: 0.95rem;
  }

  .stat-card {
    padding: 1.5rem;
  }

  .stat-value {
    font-size: 2rem;
  }

  .tech-item {
    flex-direction: column;
    gap: 0.75rem;
  }

  .tech-icon {
    font-size: 2rem;
  }

  .feature-icon {
    font-size: 2rem;
  }

  .pre {
    font-size: 0.75rem;
    padding: 1rem;
  }
}
</style>
