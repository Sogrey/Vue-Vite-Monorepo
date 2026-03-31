<script setup lang="ts">
import { ref } from 'vue'

const features = ref([
  {
    icon: '🏗️',
    title: 'Monorepo 架构',
    desc: '使用 Turborepo 管理多个包，共享依赖和配置，提高开发效率',
  },
  {
    icon: '📦',
    title: 'SDK 封装',
    desc: '封装常用工具函数和 API 请求，提高代码复用性',
  },
  {
    icon: '⚡',
    title: '极速构建',
    desc: 'Vite 提供毫秒级热更新，Turborepo 智能缓存加速构建',
  },
  {
    icon: '🎯',
    title: '类型安全',
    desc: 'TypeScript 全栈类型支持，减少运行时错误',
  },
  {
    icon: '🔧',
    title: '现代化配置',
    desc: 'ESLint + Prettier 代码规范，Git Hooks 自动检查',
  },
  {
    icon: '🚀',
    title: 'CI/CD 集成',
    desc: 'GitHub Actions 自动化构建、测试和部署',
  },
])

const techStack = ref([
  { name: 'Vue 3', icon: '💚', version: '3.4.x' },
  { name: 'Vite', icon: '⚡', version: '5.x' },
  { name: 'TypeScript', icon: '📘', version: '5.x' },
  { name: 'Turborepo', icon: '🚀', version: '2.x' },
  { name: 'pnpm', icon: '📦', version: '10.x' },
  { name: 'ESLint', icon: '✨', version: '9.x' },
])

const stats = ref([
  { label: '构建缓存加速', value: '63x', icon: '⚡' },
  { label: 'SDK 包', value: '2个', icon: '📦' },
  { label: '包管理器', value: 'pnpm', icon: '🔗' },
  { label: '代码质量', value: 'A+', icon: '✨' },
])
</script>

<template>
  <div class="home-page">
    <!-- Hero 区域 -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="title-icon">⚡</span>
          Vue + Vite + Turborepo
          <br />
          <span class="highlight">现代化 Monorepo 模板</span>
        </h1>
        <p class="hero-subtitle">
          开箱即用的高性能、可扩展的项目架构
          <br />
          助力团队快速启动新项目
        </p>
        <div class="hero-actions">
          <router-link to="/sdk1" class="action-button primary">
            <span>📦</span> SDK1 工具库
          </router-link>
          <router-link to="/sdk2" class="action-button secondary">
            <span>🌐</span> SDK2 API库
          </router-link>
        </div>
      </div>
    </div>

    <!-- 统计数据 -->
    <section class="stats-section">
      <div class="content-wrapper">
        <div class="stats-grid">
          <div v-for="stat in stats" :key="stat.label" class="stat-card">
            <div class="stat-icon">{{ stat.icon }}</div>
            <div class="stat-value">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 核心特性 -->
    <section class="features-section">
      <div class="content-wrapper">
        <div class="section-header">
          <h2>✨ 核心特性</h2>
          <p>为现代前端开发打造的最佳实践</p>
        </div>
        <div class="features-grid">
          <div v-for="feature in features" :key="feature.title" class="feature-card">
            <div class="feature-icon">{{ feature.icon }}</div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 技术栈 -->
    <section class="tech-section">
      <div class="content-wrapper">
        <div class="section-header">
          <h2>🛠️ 技术栈</h2>
          <p>采用业界最先进的工具链</p>
        </div>
        <div class="tech-grid">
          <div v-for="tech in techStack" :key="tech.name" class="tech-card">
            <div class="tech-icon">{{ tech.icon }}</div>
            <div class="tech-name">{{ tech.name }}</div>
            <div class="tech-version">{{ tech.version }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 项目结构 -->
    <section class="structure-section">
      <div class="content-wrapper">
        <div class="section-header">
          <h2>📁 项目结构</h2>
          <p>清晰的目录组织，便于团队协作</p>
        </div>
        <div class="structure-card">
          <pre>
Vue-Vite-Monorepo/
├── 📁 apps/                    # 应用目录
│   └── 📁 web/                # Web 应用
│       ├── 📁 src/
│       ├── 📁 public/
│       └── 📄 package.json
├── 📁 packages/               # 包目录
│   ├── 📁 sdk1/              # 工具函数库
│   │   ├── 📁 src/
│   │   └── 📄 package.json
│   └── 📁 sdk2/              # API 封装库
│       ├── 📁 src/
│       └── 📄 package.json
├── 📁 docs/                   # 文档目录
├── 📁 scripts/               # 脚本目录
├── 📄 turbo.json            # Turborepo 配置
├── 📄 pnpm-workspace.yaml   # pnpm workspace 配置
└── 📄 package.json          # 根 package.json
          </pre>
        </div>
      </div>
    </section>

    <!-- 快速开始 -->
    <section class="quickstart-section">
      <div class="content-wrapper">
        <div class="section-header">
          <h2>🚀 快速开始</h2>
          <p>三步启动你的项目</p>
        </div>
        <div class="steps-grid">
          <div class="step-card">
            <div class="step-number">1</div>
            <h3>克隆项目</h3>
            <code>git clone https://github.com/Sogrey/Vue-Vite-Monorepo.git</code>
          </div>
          <div class="step-card">
            <div class="step-number">2</div>
            <h3>安装依赖</h3>
            <code>pnpm install</code>
          </div>
          <div class="step-card">
            <div class="step-number">3</div>
            <h3>启动开发</h3>
            <code>pnpm dev</code>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden; /* 防止横向滚动 */
  box-sizing: border-box;
}

/* Hero 区域 */
.hero-section {
  padding: 6rem 3rem;
  background: linear-gradient(135deg, rgba(30, 144, 255, 0.1) 0%, rgba(0, 191, 255, 0.1) 100%);
  border-bottom: 1px solid rgba(30, 144, 255, 0.2);
  position: relative;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 30% 50%, rgba(30, 144, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 70% 50%, rgba(0, 191, 255, 0.15) 0%, transparent 50%);
  pointer-events: none;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin: 0 0 1.5rem 0;
  background: linear-gradient(135deg, #1e90ff 0%, #00bfff 50%, #87ceeb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.3;
  text-shadow: 0 0 30px rgba(30, 144, 255, 0.3);
}

.title-icon {
  display: inline-block;
  font-size: 3.5rem;
  animation: float 3s ease-in-out infinite;
  filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.8));
  margin-right: 0.5rem;
  -webkit-text-fill-color: initial;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

.highlight {
  font-size: 2.5rem;
}

.hero-subtitle {
  font-size: 1.3rem;
  color: #a0aec0;
  margin: 0 0 3rem 0;
  line-height: 1.8;
}

.hero-actions {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.action-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.action-button.primary {
  background: linear-gradient(135deg, #1e90ff 0%, #00bfff 100%);
  color: white;
  border: 1px solid rgba(30, 144, 255, 0.5);
}

.action-button.primary:hover {
  transform: translateY(-3px);
  box-shadow:
    0 8px 25px rgba(30, 144, 255, 0.4),
    0 0 20px rgba(30, 144, 255, 0.3);
}

.action-button.secondary {
  background: rgba(30, 144, 255, 0.1);
  color: #87ceeb;
  border: 2px solid rgba(30, 144, 255, 0.3);
}

.action-button.secondary:hover {
  background: rgba(30, 144, 255, 0.2);
  border-color: rgba(30, 144, 255, 0.5);
  transform: translateY(-3px);
  box-shadow: 0 0 20px rgba(30, 144, 255, 0.2);
}

/* 内容区域 */
.content-wrapper {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 3rem;
  box-sizing: border-box;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  margin: 0 0 1rem 0;
}

.section-header p {
  font-size: 1.1rem;
  color: #a0aec0;
  margin: 0;
}

/* 统计区域 */
.stats-section {
  padding: 4rem 0;
  background: rgba(15, 12, 41, 0.5);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
  gap: 2rem;
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
  border-color: rgba(30, 144, 255, 0.5);
  box-shadow:
    0 8px 32px rgba(30, 144, 255, 0.3),
    0 0 20px rgba(30, 144, 255, 0.2);
}

.stat-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #1e90ff 0%, #00bfff 100%);
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

/* 特性区域 */
.features-section {
  padding: 4rem 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 350px), 1fr));
  gap: 2rem;
}

.feature-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  border-color: rgba(30, 144, 255, 0.5);
  box-shadow:
    0 8px 32px rgba(30, 144, 255, 0.3),
    0 0 20px rgba(30, 144, 255, 0.2);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.feature-card h3 {
  color: white;
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.feature-card p {
  color: #a0aec0;
  margin: 0;
  line-height: 1.6;
}

/* 技术栈区域 */
.tech-section {
  padding: 4rem 0;
  background: rgba(15, 12, 41, 0.5);
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr));
  gap: 1.5rem;
}

.tech-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 12px;
  padding: 2rem 1.5rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.tech-card:hover {
  transform: translateY(-3px);
  border-color: rgba(102, 126, 234, 0.5);
}

.tech-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.tech-name {
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.tech-version {
  color: #1e90ff;
  font-size: 0.85rem;
}

/* 项目结构区域 */
.structure-section {
  padding: 4rem 0;
}

.structure-card {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow-x: auto;
  width: 100%;
  box-sizing: border-box;
}

.structure-card pre {
  color: #a0aec0;
  font-size: 0.95rem;
  line-height: 1.8;
  margin: 0;
  font-family: 'Courier New', monospace;
  white-space: pre-wrap; /* 自动换行 */
  word-wrap: break-word; /* 长单词换行 */
}

/* 快速开始区域 */
.quickstart-section {
  padding: 4rem 0;
  background: rgba(15, 12, 41, 0.5);
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: 2rem;
}

.step-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.step-card:hover {
  transform: translateY(-5px);
  border-color: rgba(102, 126, 234, 0.5);
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
}

.step-number {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #1e90ff 0%, #00bfff 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
  margin: 0 auto 1.5rem;
  box-shadow: 0 0 20px rgba(30, 144, 255, 0.4);
}

.step-card h3 {
  color: white;
  margin: 0 0 1rem 0;
  font-size: 1.3rem;
  font-weight: 600;
}

.step-card code {
  background: rgba(30, 144, 255, 0.15);
  color: #87ceeb;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  font-size: 0.95rem;
  border: 1px solid rgba(30, 144, 255, 0.3);
  display: inline-block;
}

/* 响应式 */
@media (max-width: 768px) {
  .hero-section {
    padding: 4rem 1.5rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .title-icon {
    font-size: 2rem;
  }

  .highlight {
    font-size: 1.5rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .hero-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .action-button {
    justify-content: center;
  }

  .content-wrapper {
    padding: 0 1rem;
  }

  .section-header h2 {
    font-size: 1.8rem;
  }

  .features-grid,
  .tech-grid,
  .steps-grid {
    grid-template-columns: 1fr;
  }
}
</style>
