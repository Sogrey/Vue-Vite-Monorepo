<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { formatDate, deepClone, debounce, throttle, generateId, isEmpty } from '@vue-vite-monorepo/sdk1'

// 示例数据
const currentDate = ref(formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss'))
const testId = ref(generateId())
const originalObj = { name: 'Test', nested: { value: 123 } }
const clonedObj = deepClone(originalObj)

// 防抖和节流示例
const debounceInput = ref('')
const throttleCount = ref(0)

const handleDebounceInput = debounce((value: string) => {
  console.log('防抖执行:', value)
}, 1000)

const handleThrottleClick = throttle(() => {
  throttleCount.value++
  console.log('节流执行:', throttleCount.value)
}, 1000)

onMounted(() => {
  testId.value = generateId()
})

const features = [
  {
    icon: '🕐',
    name: 'formatDate',
    desc: '日期格式化工具',
    example: "formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')"
  },
  {
    icon: '📋',
    name: 'deepClone',
    desc: '深拷贝对象',
    example: "deepClone({ name: 'test' })"
  },
  {
    icon: '🆔',
    name: 'generateId',
    desc: '生成唯一ID',
    example: 'generateId()'
  },
  {
    icon: '⏱️',
    name: 'debounce',
    desc: '防抖函数',
    example: 'debounce(fn, delay)'
  },
  {
    icon: '🚀',
    name: 'throttle',
    desc: '节流函数',
    example: 'throttle(fn, delay)'
  },
  {
    icon: '✅',
    name: 'isEmpty',
    desc: '判断是否为空',
    example: 'isEmpty({}) // true'
  }
]
</script>

<template>
  <div class="sdk-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <h1 class="page-title">
        <span class="title-icon">📦</span>
        <span class="title-text">SDK1 - 工具函数库</span>
      </h1>
      <p class="page-subtitle">常用工具函数集合，提供日期、对象、ID生成等实用工具</p>
    </div>

    <!-- 内容区域 -->
    <div class="content-wrapper">
      <!-- 功能列表 -->
      <section class="content-card">
        <div class="card-header">
          <span class="header-icon">🛠️</span>
          <h2>功能列表</h2>
        </div>
        <div class="card-body">
          <div class="feature-grid">
            <div v-for="feature in features" :key="feature.name" class="feature-item">
              <div class="feature-icon">{{ feature.icon }}</div>
              <div class="feature-content">
                <h3>{{ feature.name }}</h3>
                <p>{{ feature.desc }}</p>
                <code>{{ feature.example }}</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 实时演示 -->
      <section class="content-card">
        <div class="card-header">
          <span class="header-icon">🎯</span>
          <h2>实时演示</h2>
        </div>
        <div class="card-body">
          <div class="demo-grid">
            <!-- 日期格式化 -->
            <div class="demo-item">
              <h3>🕐 日期格式化</h3>
              <code>{{ currentDate }}</code>
            </div>

            <!-- ID生成 -->
            <div class="demo-item">
              <h3>🆔 唯一ID生成</h3>
              <code>{{ testId }}</code>
            </div>

            <!-- 深拷贝 -->
            <div class="demo-item">
              <h3>📋 深拷贝</h3>
              <div class="code-block">
                <pre>原对象: {{ JSON.stringify(originalObj) }}
拷贝后: {{ JSON.stringify(clonedObj) }}</pre>
              </div>
            </div>

            <!-- 判空 -->
            <div class="demo-item">
              <h3>✅ 判断空值</h3>
              <div class="bool-group">
                <span class="tag tag-true">isEmpty({}): {{ isEmpty({}) }}</span>
                <span class="tag tag-false">isEmpty([1]): {{ isEmpty([1]) }}</span>
              </div>
            </div>

            <!-- 防抖 -->
            <div class="demo-item">
              <h3>⏱️ 防抖函数 (1秒延迟)</h3>
              <input
                v-model="debounceInput"
                @input="handleDebounceInput($event.target.value)"
                placeholder="输入内容，1秒后执行"
                class="demo-input"
              />
              <p class="hint">在控制台查看输出</p>
            </div>

            <!-- 节流 -->
            <div class="demo-item">
              <h3>🚀 节流函数 (1秒间隔)</h3>
              <button @click="handleThrottleClick" class="demo-button">
                点击计数: {{ throttleCount }}
              </button>
              <p class="hint">在控制台查看输出</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 文档提示 -->
      <section class="content-card">
        <div class="card-header">
          <span class="header-icon">📖</span>
          <h2>API 文档</h2>
        </div>
        <div class="card-body">
          <div class="placeholder-doc">
            <span class="placeholder-icon">📚</span>
            <p>文档正在编写中...</p>
            <p class="hint">请稍后访问查看完整的 API 文档</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.sdk-page {
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
}

.page-subtitle {
  font-size: 1.1rem;
  color: #a0aec0;
  margin: 0;
  letter-spacing: 1px;
}

/* 内容区域 */
.content-wrapper {
  padding: 2rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.content-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.content-card:hover {
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

/* 功能网格 */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
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
  transform: translateX(5px);
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.feature-content h3 {
  color: #667eea;
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  font-family: 'Courier New', monospace;
}

.feature-content p {
  color: #a0aec0;
  margin: 0 0 0.75rem 0;
  font-size: 0.95rem;
}

.feature-content code {
  background: rgba(102, 126, 234, 0.2);
  color: #f093fb;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.85rem;
  border: 1px solid rgba(102, 126, 234, 0.3);
  display: inline-block;
}

/* 演示网格 */
.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: 1.5rem;
}

.demo-item {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.demo-item h3 {
  color: white;
  margin: 0 0 1rem 0;
  font-size: 1rem;
  font-weight: 600;
}

.demo-item code {
  background: rgba(102, 126, 234, 0.2);
  color: #f093fb;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  display: inline-block;
  border: 1px solid rgba(102, 126, 234, 0.3);
  word-break: break-all;
}

.code-block pre {
  background: rgba(0, 0, 0, 0.3);
  color: #a0aec0;
  padding: 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  line-height: 1.6;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin: 0.5rem 0 0 0;
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.bool-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.tag {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
}

.tag-true {
  background: rgba(72, 187, 120, 0.2);
  color: #68d391;
  border: 1px solid rgba(72, 187, 120, 0.3);
}

.tag-false {
  background: rgba(245, 101, 101, 0.2);
  color: #fc8181;
  border: 1px solid rgba(245, 101, 101, 0.3);
}

.demo-input {
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: white;
  font-size: 0.95rem;
  outline: none;
  transition: all 0.3s ease;
}

.demo-input:focus {
  border-color: rgba(102, 126, 234, 0.5);
  background: rgba(255, 255, 255, 0.08);
}

.demo-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.demo-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.hint {
  color: #a0aec0;
  font-size: 0.85rem;
  margin: 0.5rem 0 0 0;
  font-style: italic;
}

/* 文档占位 */
.placeholder-doc {
  text-align: center;
  padding: 3rem;
  color: #a0aec0;
}

.placeholder-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.placeholder-doc p {
  margin: 0.5rem 0;
}

/* 响应式 */
@media (max-width: 768px) {
  .page-header {
    padding: 1.5rem;
  }

  .page-title {
    font-size: 1.75rem;
  }

  .content-wrapper {
    padding: 1rem;
  }

  .card-body {
    padding: 1.5rem;
  }

  .feature-grid,
  .demo-grid {
    grid-template-columns: 1fr;
  }
}
</style>
