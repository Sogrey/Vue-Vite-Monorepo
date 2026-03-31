# GitHub Pages 部署说明

## 📋 问题解决

### 问题 1: 路由刷新 404

**原因**: 
- 使用 `createWebHistory`（history 模式）在 GitHub Pages 上刷新会 404
- GitHub Pages 是静态服务器，不支持 SPA 的 history 路由

**解决方案**: 
- ✅ 改用 `createWebHashHistory`（hash 模式）
- URL 格式从 `/sdk1` 变为 `/#/sdk1`
- 支持刷新和直接访问

### 问题 2: SDK 文档 404

**原因**: 
- 文档未正确部署到 GitHub Pages
- 构建产物中缺少文档文件

**解决方案**: 
- ✅ 修复构建流程，确保文档正确复制到 `dist/docs` 目录
- ✅ 使用 `import.meta.env.BASE_URL` 动态获取文档路径
- ✅ 创建专用构建脚本 `build:github-pages`

## 🚀 构建和部署

### 方式一：使用专用脚本（推荐）

```bash
# 为 GitHub Pages 构建（包含文档）
pnpm build:github-pages
```

此命令会：
1. 生成 SDK 文档
2. 复制文档到 public 目录
3. 构建 web 应用
4. 整理构建产物到 `build/web`

### 方式二：手动构建

```bash
# 1. 生成文档
pnpm docs:all

# 2. 构建 web 应用
pnpm build --filter=web

# 3. 整理构建产物
# 将 apps/web/dist 部署到 GitHub Pages
```

## 📂 目录结构

```
build/web/                    # GitHub Pages 部署目录
├── index.html               # 主页面
├── favicon.ico              # 图标
├── assets/                  # 应用资源
│   ├── index-[hash].js
│   └── index-[hash].css
└── docs/                    # SDK 文档
    ├── sdk1-doc/           # SDK1 文档
    │   ├── index.html
    │   └── ...
    └── sdk2-doc/           # SDK2 文档
        ├── index.html
        └── ...
```

## 🌐 访问地址

### Hash 路由模式

- **主页**: `http://sogrey.top/Vue-Vite-Monorepo/#/`
- **SDK1**: `http://sogrey.top/Vue-Vite-Monorepo/#/sdk1`
- **SDK2**: `http://sogrey.top/Vue-Vite-Monorepo/#/sdk2`
- **About**: `http://sogrey.top/Vue-Vite-Monorepo/#/about`

### SDK 文档

- **SDK1 文档**: `http://sogrey.top/Vue-Vite-Monorepo/docs/sdk1-doc/index.html`
- **SDK2 文档**: `http://sogrey.top/Vue-Vite-Monorepo/docs/sdk2-doc/index.html`

## 🔧 技术细节

### 路由配置

```typescript
// apps/web/src/router/index.ts
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),  // 使用 hash 模式
  routes: [...]
})
```

### 文档 URL 配置

```typescript
// apps/web/src/views/Sdk1View.vue
const docUrl = `${import.meta.env.BASE_URL}docs/sdk1-doc/index.html`

// apps/web/src/views/Sdk2View.vue  
const docUrl = `${import.meta.env.BASE_URL}docs/sdk2-doc/index.html`
```

### Vite 配置

```typescript
// apps/web/vite.config.ts
export default defineConfig({
  base: '/Vue-Vite-Monorepo',  // GitHub Pages base 路径
  server: {
    fs: {
      allow: ['..']  // 允许访问父目录
    }
  }
})
```

## 📝 更新日志

### v0.4.1 (2026-03-31)

#### Changed
- 🔄 路由模式从 `createWebHistory` 改为 `createWebHashHistory`
- 🔄 文档 URL 使用 `import.meta.env.BASE_URL` 动态获取

#### Fixed
- 🐛 修复 GitHub Pages 刷新页面 404 问题
- 🐛 修复 SDK 文档在 GitHub Pages 上 404 的问题
- 🐛 修复构建产物中缺少文档文件的问题

#### Added
- ✨ 新增 `build:github-pages` 专用构建脚本
- 📝 新增 GitHub Pages 部署说明文档

## 💡 注意事项

1. **Hash 路由**: URL 中会包含 `#` 符号，但不影响使用
2. **文档路径**: 文档使用绝对路径，确保在任何路由下都能访问
3. **构建顺序**: 必须先生成文档，再构建 web 应用
4. **部署目录**: 将 `build/web` 目录部署到 GitHub Pages

## 🎉 总结

通过改用 hash 路由模式和优化构建流程，成功解决了 GitHub Pages 部署的两个主要问题：
1. ✅ 页面刷新和直接访问不再 404
2. ✅ SDK 文档正确部署并可访问
