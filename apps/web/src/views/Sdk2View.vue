<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { HttpClient, storage } from '@vue-vite-monorepo/sdk2'

// HTTP 客户端实例
const httpClient = new HttpClient({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000
})

// 示例数据
const apiData = ref<any>(null)
const loading = ref(false)
const storageData = ref<any>(null)

// 文档展示模式
const docViewMode = ref<'iframe' | 'link'>('iframe')
// 使用绝对路径，避免 base 标签问题
const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '')
const docUrl = `${baseUrl}/docs/sdk2-doc/index.html`

// API 方法列表
const apiMethods = [
  {
    icon: '📥',
    name: 'GET',
    desc: '获取资源',
    example: "httpClient.get('/users/1')"
  },
  {
    icon: '📤',
    name: 'POST',
    desc: '创建资源',
    example: "httpClient.post('/users', data)"
  },
  {
    icon: '✏️',
    name: 'PUT',
    desc: '更新资源',
    example: "httpClient.put('/users/1', data)"
  },
  {
    icon: '🗑️',
    name: 'DELETE',
    desc: '删除资源',
    example: "httpClient.delete('/users/1')"
  }
]

// 存储方法
const storageMethods = [
  {
    icon: '💾',
    name: 'set',
    desc: '设置存储',
    example: "storage.set('key', value)"
  },
  {
    icon: '📖',
    name: 'get',
    desc: '获取存储',
    example: "storage.get('key')"
  },
  {
    icon: '🗑️',
    name: 'remove',
    desc: '删除存储',
    example: "storage.remove('key')"
  },
  {
    icon: '🧹',
    name: 'clear',
    desc: '清空存储',
    example: 'storage.clear()'
  }
]

// 测试 API 请求
const testApi = async () => {
  loading.value = true
  try {
    const response = await httpClient.get('/posts/1')
    apiData.value = response.data
  } catch (error) {
    console.error('API 请求失败:', error)
  } finally {
    loading.value = false
  }
}

// 测试存储
const testStorage = () => {
  const testData = {
    name: 'SDK2 Test',
    timestamp: new Date().toISOString(),
    random: Math.random()
  }
  storage.set('sdk2-test', testData)
  storageData.value = storage.get('sdk2-test')
}

const openDocInNewTab = () => {
  window.open(docUrl, '_blank')
}

onMounted(() => {
  testApi()
  testStorage()
})
</script>

<template>
  <div class="sdk-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <h1 class="page-title">
        <span class="title-icon">🌐</span>
        <span class="title-text">SDK2 - API 请求封装库</span>
      </h1>
      <p class="page-subtitle">HTTP 客户端封装，提供请求、拦截器、本地存储等功能</p>
    </div>

    <!-- 内容区域 -->
    <div class="content-wrapper">
      <!-- HTTP 方法 -->
      <section class="content-card">
        <div class="card-header">
          <span class="header-icon">🔗</span>
          <h2>HTTP 方法</h2>
        </div>
        <div class="card-body">
          <div class="method-grid">
            <div v-for="method in apiMethods" :key="method.name" class="method-item">
              <div class="method-icon">{{ method.icon }}</div>
              <div class="method-content">
                <h3>{{ method.name }}</h3>
                <p>{{ method.desc }}</p>
                <code>{{ method.example }}</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 存储方法 -->
      <section class="content-card">
        <div class="card-header">
          <span class="header-icon">💾</span>
          <h2>本地存储</h2>
        </div>
        <div class="card-body">
          <div class="method-grid">
            <div v-for="method in storageMethods" :key="method.name" class="method-item">
              <div class="method-icon">{{ method.icon }}</div>
              <div class="method-content">
                <h3>{{ method.name }}</h3>
                <p>{{ method.desc }}</p>
                <code>{{ method.example }}</code>
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
            <!-- HTTP 请求演示 -->
            <div class="demo-item demo-item-large">
              <h3>🔗 HTTP GET 请求</h3>
              <div class="api-info">
                <span class="label">Base URL:</span>
                <code>https://jsonplaceholder.typicode.com</code>
              </div>

              <div v-if="loading" class="loading-state">
                <div class="spinner"></div>
                <span>加载中...</span>
              </div>

              <div v-else-if="apiData" class="api-response">
                <div class="response-header">
                  <span class="status-badge">✓ 200 OK</span>
                  <button @click="testApi" class="retry-button">重新请求</button>
                </div>
                <pre>{{ JSON.stringify(apiData, null, 2) }}</pre>
              </div>
            </div>

            <!-- 本地存储演示 -->
            <div class="demo-item">
              <h3>💾 本地存储</h3>
              <div class="storage-demo">
                <button @click="testStorage" class="demo-button">写入新数据</button>
                <div v-if="storageData" class="storage-result">
                  <pre>{{ JSON.stringify(storageData, null, 2) }}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 配置选项 -->
      <section class="content-card">
        <div class="card-header">
          <span class="header-icon">⚙️</span>
          <h2>配置选项</h2>
        </div>
        <div class="card-body">
          <div class="config-table">
            <div class="config-row">
              <div class="config-key">baseURL</div>
              <div class="config-value">API 基础地址</div>
              <div class="config-type">string</div>
            </div>
            <div class="config-row">
              <div class="config-key">timeout</div>
              <div class="config-value">请求超时时间（毫秒）</div>
              <div class="config-type">number</div>
            </div>
            <div class="config-row">
              <div class="config-key">headers</div>
              <div class="config-value">请求头配置</div>
              <div class="config-type">object</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 文档展示 -->
      <section class="content-card">
        <div class="card-header">
          <span class="header-icon">📖</span>
          <h2>API 文档</h2>
          <div class="doc-actions">
            <button 
              @click="docViewMode = 'iframe'" 
              :class="['mode-btn', { active: docViewMode === 'iframe' }]"
            >
              内嵌显示
            </button>
            <button 
              @click="docViewMode = 'link'" 
              :class="['mode-btn', { active: docViewMode === 'link' }]"
            >
              链接卡片
            </button>
            <button @click="openDocInNewTab" class="open-btn">
              🔗 新窗口打开
            </button>
          </div>
        </div>
        <div class="card-body">
          <!-- iframe 模式 -->
          <div v-if="docViewMode === 'iframe'" class="doc-iframe-wrapper">
            <iframe 
              :src="docUrl" 
              class="doc-iframe"
              frameborder="0"
              allowfullscreen
            ></iframe>
          </div>
          
          <!-- 链接卡片模式 -->
          <div v-else class="doc-link-wrapper">
            <div class="doc-link-card" @click="openDocInNewTab">
              <div class="doc-link-icon">📚</div>
              <div class="doc-link-content">
                <h3>SDK2 API 文档</h3>
                <p>查看完整的 API 请求封装库文档</p>
                <div class="doc-link-url">{{ docUrl }}</div>
              </div>
              <div class="doc-link-arrow">→</div>
            </div>
            <div class="doc-tips">
              <p>💡 提示：点击上方卡片可在新窗口中查看完整的 API 文档</p>
            </div>
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

/* 方法网格 */
.method-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: 1.5rem;
}

.method-item {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.method-item:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(102, 126, 234, 0.5);
  transform: translateX(5px);
}

.method-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.method-content h3 {
  color: #667eea;
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  font-family: 'Courier New', monospace;
}

.method-content p {
  color: #a0aec0;
  margin: 0 0 0.75rem 0;
  font-size: 0.95rem;
}

.method-content code {
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
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 400px), 1fr));
  gap: 1.5rem;
}

.demo-item {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.demo-item-large {
  grid-column: 1 / -1;
}

.demo-item h3 {
  color: white;
  margin: 0 0 1rem 0;
  font-size: 1rem;
  font-weight: 600;
}

.api-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.label {
  color: #a0aec0;
  font-weight: 600;
}

.api-info code {
  background: rgba(102, 126, 234, 0.2);
  color: #f093fb;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.85rem;
  border: 1px solid rgba(102, 126, 234, 0.3);
}

.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  color: #a0aec0;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(102, 126, 234, 0.3);
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.api-response {
  margin-top: 1rem;
}

.response-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.status-badge {
  background: rgba(72, 187, 120, 0.2);
  color: #68d391;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  border: 1px solid rgba(72, 187, 120, 0.3);
}

.retry-button {
  background: rgba(102, 126, 234, 0.2);
  color: #667eea;
  border: 1px solid rgba(102, 126, 234, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-button:hover {
  background: rgba(102, 126, 234, 0.3);
}

pre {
  background: rgba(0, 0, 0, 0.3);
  color: #a0aec0;
  padding: 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  line-height: 1.6;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow-x: auto;
  margin: 0.5rem 0 0 0;
  white-space: pre-wrap;
  word-wrap: break-word;
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
  margin-bottom: 1rem;
}

.demo-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.storage-result {
  margin-top: 1rem;
}

/* 配置表格 */
.config-table {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
}

.config-row {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.config-row:last-child {
  border-bottom: none;
}

.config-key,
.config-value,
.config-type {
  padding: 1rem;
  color: #a0aec0;
}

.config-key {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  font-weight: 600;
  font-family: 'Courier New', monospace;
}

.config-type {
  text-align: right;
  font-style: italic;
  color: #f093fb;
}

/* 文档展示 */
.doc-actions {
  margin-left: auto;
  display: flex;
  gap: 0.5rem;
}

.mode-btn {
  background: rgba(102, 126, 234, 0.1);
  color: #a0aec0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.mode-btn:hover {
  background: rgba(102, 126, 234, 0.2);
  color: white;
}

.mode-btn.active {
  background: rgba(102, 126, 234, 0.3);
  color: #667eea;
  border-color: rgba(102, 126, 234, 0.5);
}

.open-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.open-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.doc-iframe-wrapper {
  position: relative;
  width: 100%;
  height: 800px;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.doc-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.doc-link-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.doc-link-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.doc-link-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(102, 126, 234, 0.5);
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.2);
}

.doc-link-icon {
  font-size: 3rem;
  opacity: 0.8;
}

.doc-link-content {
  flex: 1;
}

.doc-link-content h3 {
  color: #667eea;
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  font-weight: 700;
}

.doc-link-content p {
  color: #a0aec0;
  margin: 0 0 0.5rem 0;
  font-size: 0.95rem;
}

.doc-link-url {
  color: #f093fb;
  font-size: 0.85rem;
  font-family: 'Courier New', monospace;
  background: rgba(102, 126, 234, 0.1);
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  display: inline-block;
}

.doc-link-arrow {
  font-size: 2rem;
  color: #667eea;
  opacity: 0.5;
  transition: all 0.3s ease;
}

.doc-link-card:hover .doc-link-arrow {
  opacity: 1;
  transform: translateX(5px);
}

.doc-tips {
  text-align: center;
  padding: 1rem;
  color: #a0aec0;
  font-size: 0.9rem;
}

.doc-tips p {
  margin: 0;
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

  .method-grid,
  .demo-grid {
    grid-template-columns: 1fr;
  }

  .config-row {
    grid-template-columns: 1fr;
  }

  .config-type {
    text-align: left;
  }

  .doc-actions {
    flex-wrap: wrap;
  }

  .doc-iframe-wrapper {
    height: 600px;
  }

  .doc-link-card {
    flex-direction: column;
    text-align: center;
  }
}
</style>
