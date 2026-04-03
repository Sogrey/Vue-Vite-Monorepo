# SDK 文档前端集成说明

## 📋 概述

已成功将 JSDoc 文档集成到前端页面中，支持 iframe 内嵌显示和新窗口打开两种方式。

## 🎯 实现功能

### 1. 双模式展示

- **iframe 内嵌显示**：直接在页面内嵌入完整的 API 文档
- **链接卡片模式**：以卡片形式展示，点击后在新窗口打开

### 2. 新窗口打开

- 提供"新窗口打开"按钮，可在新标签页中查看完整文档

### 3. 响应式设计

- 桌面端和移动端自适应布局
- 移动端优化显示效果

## 📂 文件结构

```
apps/web/
├── public/
│   └── docs/              # 文档静态文件
│       ├── sdk1-doc/      # SDK1 文档
│       └── sdk2-doc/      # SDK2 文档
├── src/
│   └── views/
│       ├── Sdk1View.vue   # SDK1 页面（已集成文档展示）
│       └── Sdk2View.vue   # SDK2 页面（已集成文档展示）
└── vite.config.ts         # Vite 配置（已更新）

scripts/
├── copy-docs.js           # 文档复制脚本
└── build-distribute.js    # 构建分发脚本（已更新）
```

## 🚀 使用方法

### 开发环境

1. **生成文档**（如果还没有生成）：

   ```bash
   pnpm docs:all
   ```

2. **复制文档到 public 目录**：

   ```bash
   pnpm docs:copy
   ```

3. **启动开发服务器**：

   ```bash
   pnpm dev --filter=web
   ```

4. **访问页面**：
   - SDK1: http://localhost:5173/Vue-Vite-Monorepo#/sdk1
   - SDK2: http://localhost:5173/Vue-Vite-Monorepo#/sdk2

### 生产构建

运行以下命令会自动完成所有步骤：

```bash
pnpm build:distribute
```

此命令会：

1. 生成 SDK 文档
2. 构建所有包
3. 整理构建产物
4. 复制文档到正确位置

## 🎨 页面功能

### 文档展示控制

每个 SDK 页面的文档区域提供三个操作：

1. **内嵌显示**：切换到 iframe 模式
2. **链接卡片**：切换到卡片模式
3. **新窗口打开**：在新标签页打开文档

### iframe 模式

- 直接在页面内嵌入完整的 JSDoc 文档
- 高度 800px（移动端 600px）
- 白色背景，圆角边框

### 链接卡片模式

- 以卡片形式展示文档链接
- 包含图标、标题、描述和 URL
- 悬停效果和点击动画

## 📝 配置说明

### 文档 URL

文档 URL 在 Vue 组件中定义：

```typescript
// SDK1
const docUrl = '/Vue-Vite-Monorepo/docs/sdk1-doc/index.html'

// SDK2
const docUrl = '/Vue-Vite-Monorepo/docs/sdk2-doc/index.html'
```

> 注意：`/Vue-Vite-Monorepo` 是 Vite 的 `base` 配置，确保路径正确。

### Vite 配置

`vite.config.ts` 已配置允许访问项目根目录：

```typescript
server: {
  fs: {
    allow: ['..']
  }
}
```

## 🔧 维护说明

### 更新文档

当 SDK 源码更新后，需要重新生成文档：

```bash
# 生成文档
pnpm docs:all

# 复制到 public 目录
pnpm docs:copy

# 或者一步完成
pnpm build:distribute
```

### .gitignore

`apps/web/public/docs/` 目录已被忽略，不会提交到 git。

文档在构建时自动生成，开发时运行 `pnpm docs:copy` 复制。

## 📊 技术栈

- **Vue 3** - Composition API
- **iframe** - 内嵌文档显示
- **Vite** - 开发服务器和构建工具
- **JSDoc** - 文档生成工具

## 🎉 总结

SDK 文档已成功集成到前端页面，提供灵活的展示方式和良好的用户体验。开发者可以在浏览 SDK 功能的同时，方便地查看完整的 API 文档。
