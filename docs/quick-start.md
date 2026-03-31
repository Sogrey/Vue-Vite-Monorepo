# 快速开始指南

本指南帮助你在 5 分钟内快速上手 Vue + Vite + Turborepo Monorepo 项目。

## 前置要求

- Node.js >= 20.19.0 或 >= 22.12.0
- pnpm >= 10.6.5

```bash
# 安装 pnpm（如果还没安装）
npm install -g pnpm

# 验证版本
node -v
pnpm -v
```

## 安装依赖

```bash
pnpm install
```

这将安装所有应用和包的依赖。

## 开发模式

### 启动所有应用

```bash
pnpm dev
```

这会并行启动：
- `apps/web` 的 Vite 开发服务器（http://localhost:5173）
- `packages/sdk1` 和 `packages/sdk2` 的 watch 模式

### 只启动特定应用

```bash
# 只启动 web 应用
turbo dev --filter=web

# 只启动 admin 应用（如果存在）
turbo dev --filter=admin
```

## 构建项目

### 构建所有包

```bash
pnpm build
```

Turborepo 会自动分析依赖关系，按正确顺序构建：
1. 先构建 `packages/sdk1` 和 `packages/sdk2`（并行）
2. 再构建 `apps/web`

### 只构建某个包

```bash
# 只构建 sdk1
turbo build --filter=sdk1

# 只构建 web 应用
turbo build --filter=web

# 构建 web 及其所有依赖
turbo build --filter=web...
```

## 其他常用命令

### 代码检查

```bash
# 检查所有包
pnpm lint

# 只检查某个包
turbo lint --filter=web
```

### 类型检查

```bash
# 检查所有包
pnpm type-check

# 只检查某个包
turbo type-check --filter=sdk1
```

### 清理构建产物

```bash
pnpm clean
```

### 格式化代码

```bash
pnpm format
```

## 项目结构

```
vue-vite-monorepo/
├── apps/           # 应用目录
│   └── web/        # Vue 3 Web 应用
├── packages/       # 公共包目录
│   ├── sdk1/       # 工具函数库
│   └── sdk2/       # API 请求封装库
└── docs/           # 文档目录
```

## 在应用中使用 SDK 包

### 安装依赖

在 `apps/web/package.json` 中：

```json
{
  "dependencies": {
    "@vue-vite-monorepo/sdk1": "workspace:*",
    "@vue-vite-monorepo/sdk2": "workspace:*"
  }
}
```

### 使用 SDK1 工具函数

```typescript
import { formatDate, deepClone, debounce, generateId, isEmpty } from '@vue-vite-monorepo/sdk1'

// 日期格式化
const date = formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')

// 深拷贝
const cloned = deepClone({ name: 'test', nested: { value: 123 } })

// 防抖
const handleSearch = debounce((query: string) => {
  console.log('搜索:', query)
}, 500)

// 生成唯一ID
const id = generateId()

// 判断空值
const empty = isEmpty({})
```

### 使用 SDK2 HTTP 客户端

```typescript
import { HttpClient, storage } from '@vue-vite-monorepo/sdk2'

// 创建 HTTP 客户端
const client = new HttpClient({
  baseURL: 'https://api.example.com',
  timeout: 5000
})

// GET 请求
const response = await client.get('/users')

// POST 请求
const created = await client.post('/users', { name: 'John' })

// 本地存储
storage.set('token', 'abc123')
const token = storage.get('token')
```

## 开发工作流

### 1. 开发新功能

```bash
# 1. 启动开发服务器
pnpm dev

# 2. 在浏览器打开 http://localhost:5173

# 3. 修改代码，热更新自动生效
```

### 2. 修改 SDK 包

```bash
# 1. 修改 packages/sdk1/src/index.ts 或 packages/sdk2/src/index.ts

# 2. SDK 包会自动重新构建（watch 模式）

# 3. Web 应用会自动更新（热更新）
```

### 3. 构建生产版本

```bash
# 1. 构建所有包
pnpm build

# 2. 构建产物在各自的 dist 目录
# - apps/web/dist/
# - packages/sdk1/dist/
# - packages/sdk2/dist/

# 3. 预览 Web 应用
cd apps/web && pnpm preview
```

## Turborepo 缓存

### 查看缓存状态

```bash
turbo build --dry-run
```

### 清除缓存

```bash
# 清除 Turborepo 缓存
pnpm clean

# 或手动删除
rm -rf .turbo node_modules/.cache/turbo
```

### 增量构建示例

```bash
# 第一次构建（全部重新构建）
pnpm build

# 没有修改任何文件
pnpm build  # ⚡ 所有任务都命中缓存，瞬间完成

# 修改 packages/sdk1/src/index.ts
pnpm build  # ⚡ 只重新构建 sdk1 和 web，sdk2 使用缓存
```

## 常见问题

### Q: 端口被占用怎么办？

修改 `apps/web/vite.config.ts`：

```typescript
export default defineConfig({
  server: {
    port: 3000  // 修改为其他端口
  }
})
```

### Q: 如何添加新的依赖？

```bash
# 为 web 应用添加依赖
cd apps/web
pnpm add axios

# 为 SDK 包添加依赖
cd packages/sdk1
pnpm add lodash

# 添加开发依赖
pnpm add -D @types/lodash

# 回到根目录重新安装
cd ../..
pnpm install
```

### Q: 如何添加新的 SDK 包？

参考 `docs/project-structure.md` 中的"添加新包"章节。

### Q: 如何在 CI/CD 中使用？

```yaml
# .github/workflows/ci.yml
- name: Install dependencies
  run: pnpm install

- name: Build
  run: pnpm build

- name: Test
  run: pnpm test
```

## 下一步

- 📖 阅读 [Turborepo 完全指南](./turborepo-guide.md)
- 📖 阅读 [项目结构说明](./project-structure.md)
- 🚀 开始开发你的应用！

## 获取帮助

- [Turborepo 官方文档](https://turbo.build/repo/docs)
- [Vue 3 官方文档](https://vuejs.org/)
- [Vite 官方文档](https://vitejs.dev/)
- [pnpm 官方文档](https://pnpm.io/)
