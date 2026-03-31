<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { formatDate, deepClone, debounce, generateId, isEmpty } from '@vue-vite-monorepo/sdk1'
import { HttpClient, storage } from '@vue-vite-monorepo/sdk2'

// SDK1 示例
const currentDate = ref(formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss'))
const testId = ref(generateId())

// SDK2 示例
const httpClient = new HttpClient({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000
})

const apiData = ref<any>(null)
const loading = ref(false)

// 使用防抖函数
const handleSearch = debounce((query: string) => {
  console.log('搜索:', query)
}, 500)

// 测试深拷贝
const originalObject = { name: 'Test', nested: { value: 123 } }
const clonedObject = deepClone(originalObject)

// 测试本地存储
onMounted(async () => {
  // 存储数据
  storage.set('test-key', { name: 'Monorepo Test', version: '1.0.0' })
  const stored = storage.get('test-key')
  console.log('从存储中读取:', stored)

  // 测试 API 请求
  loading.value = true
  try {
    const response = await httpClient.get('/posts/1')
    apiData.value = response.data
  } catch (error) {
    console.error('API 请求失败:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <main>
    <div class="sdk-demo">
      <h1>Monorepo SDK 集成演示</h1>
      
      <section class="sdk-section">
        <h2>SDK1 - 工具函数库</h2>
        <div class="demo-item">
          <h3>日期格式化</h3>
          <p>当前时间: <code>{{ currentDate }}</code></p>
        </div>
        
        <div class="demo-item">
          <h3>生成唯一ID</h3>
          <p>生成的ID: <code>{{ testId }}</code></p>
        </div>
        
        <div class="demo-item">
          <h3>深拷贝</h3>
          <p>原对象: <code>{{ originalObject }}</code></p>
          <p>拷贝对象: <code>{{ clonedObject }}</code></p>
        </div>
        
        <div class="demo-item">
          <h3>判断空值</h3>
          <p>空对象: <code>{{ isEmpty({}) }}</code></p>
          <p>非空数组: <code>{{ isEmpty([1, 2, 3]) }}</code></p>
        </div>
      </section>

      <section class="sdk-section">
        <h2>SDK2 - API 请求封装库</h2>
        <div class="demo-item">
          <h3>HTTP 客户端</h3>
          <p>Base URL: <code>https://jsonplaceholder.typicode.com</code></p>
          
          <div v-if="loading">加载中...</div>
          <div v-else-if="apiData">
            <h4>API 响应数据:</h4>
            <pre>{{ JSON.stringify(apiData, null, 2) }}</pre>
          </div>
        </div>
        
        <div class="demo-item">
          <h3>本地存储</h3>
          <p>已在本地存储中设置测试数据</p>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.sdk-demo {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #42b883;
  margin-bottom: 2rem;
}

.sdk-section {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.sdk-section h2 {
  color: #35495e;
  border-bottom: 2px solid #42b883;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
}

.demo-item {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: white;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.demo-item h3 {
  color: #666;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

code {
  background: #f0f0f0;
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  color: #e83e8c;
}

pre {
  background: #282c34;
  color: #abb2bf;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 0.9rem;
  line-height: 1.5;
}
</style>
