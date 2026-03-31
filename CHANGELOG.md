# Changelog

All notable changes to this project will be documented in this file.

## [0.4.1] - 2026-03-31

### Changed
- 🔄 路由模式从 `createWebHistory` 改为 `createWebHashHistory`
  - URL 格式从 `/sdk1` 变为 `/#/sdk1`
  - 支持 GitHub Pages 刷新和直接访问
- 🔄 文档 URL 使用 `import.meta.env.BASE_URL` 动态获取
  - 确保在不同环境下路径正确

### Fixed
- 🐛 修复 GitHub Pages 刷新页面 404 问题
  - 使用 hash 路由模式解决 history 模式兼容性问题
- 🐛 修复 SDK 文档在 GitHub Pages 上 404 的问题
  - 确保文档正确复制到构建产物
  - 使用动态路径配置
- 🐛 修复构建产物中缺少文档文件的问题
  - 优化构建流程，先生成文档再构建

### Added
- ✨ 新增 `build:github-pages` 专用构建脚本
  - 自动完成文档生成、复制和构建
- 📝 新增 GitHub Pages 部署说明文档
  - 详细说明问题和解决方案
  - 提供完整的部署指南

## [0.4.0] - 2026-03-31

### Added
- 📄 SDK 文档生成系统集成
  - 为 SDK1 和 SDK2 集成 JSDoc 文档生成功能
  - 支持从 TypeScript 源码生成 API 文档
  - 使用 jsdoc-babel 插件解析 TypeScript
  - 文档输出到 `build/sdk1-doc/` 和 `build/sdk2-doc/`
  - 添加 npm 脚本: `docs:sdk1`, `docs:sdk2`, `docs:all`

### Technical Details
- 安装依赖: `jsdoc`, `jsdoc-babel`, `@babel/core`, `@babel/preset-env`, `@babel/preset-typescript`, `taffydb`
- 创建 JSDoc 配置文件: `scripts/jsdoc/sdk1.conf.json`, `scripts/jsdoc/sdk2.conf.json`
- 从参考项目拷贝并配置文档模板: `scripts/jsdoc/jsdoc_template/`
- 为 SDK1 和 SDK2 源码添加完整的 JSDoc 注释
- 解决 TypeScript 类型解析问题,简化复杂类型表达式

### Documentation
- 📝 创建 SDK 文档生成计划文档 (`docs/sdk-doc-generation-plan.md`)
- 📝 更新 README.md,添加 SDK 文档生成说明
- 📝 增强 packages/sdk1/src/index.ts 的 JSDoc 注释
- 📝 增强 packages/sdk2/src/index.ts 的 JSDoc 注释

## [0.3.0] - 2026-03-31

### Added
- 🎨 新增 SDK1 和 SDK2 专属页面
  - SDK1 工具函数库展示页面（含实时演示）
  - SDK2 API 请求封装库展示页面（含实时演示）
- 🎨 前端 UI 现代化科技风格升级
  - 桌面端左右布局（左侧导航 + 右侧内容区）
  - 移动端传统上下布局（顶部导航栏）
  - 半透明背景 + 蓝色边框光晕效果
- 🎨 科幻蓝图网格背景
  - CSS Grid 多层网格叠加
  - 深色蓝图风格背景
  - 蓝色主题色系

### Changed
- 🎨 重构 App.vue 布局系统
  - 桌面端：固定左侧导航（260px）+ 右侧内容区铺满
  - 移动端：顶部横向导航 + 内容区 100%
  - 响应式断点：768px
- 🎨 更新全局 CSS 变量系统
  - 新增 variables.css 统一管理主题色
  - 科幻蓝色主题色系

### Fixed
- 🐛 修复右侧内容区宽度问题
  - 移除 max-width 限制
  - 添加 overflow-x: hidden
  - 添加 box-sizing: border-box
- 🐛 修复网格背景高度问题
  - 将背景从 #app 移到 body
  - 使用 min-height: 100vh 确保铺满整个页面
  - 添加 background-attachment: fixed 使网格固定
- 🐛 移除网格移动动画，保持静态背景

### Removed
- 🧹 移除未使用的 counter.ts 文件

## [0.2.0] - 2026-03-31

### Changed
- 🧹 清理未使用的资产和组件
  - 移除 Vue 默认示例组件（HelloWorld、TheWelcome、WelcomeItem、icons）
  - 移除未使用的 logo.svg
  - 简化 App.vue，移除示例代码

### Optimized
- ⚡ 优化 Turborepo 配置，针对 Vue + Vite 进行专项优化
  - 添加 dev 任务依赖处理
  - 精细化 inputs 配置
  - 优化 outputs 缓存策略
  - 添加 Vite 环境变量支持

### Added
- 📝 新增 Vue + Vite 专属配置文档 (`docs/vue-vite-config.md`)
- 📝 新增配置优化记录文档 (`docs/config-optimization.md`)
- ⚙️ 更新 turbo.json 配置以适配 Vue + Vite 最佳实践

### Performance
- 🚀 构建性能优化：缓存命中率达 100%
- ⚡ 第二次构建时间：98ms（性能提升 63 倍）

## [0.1.0] - 2026-03-31

### Added

#### Monorepo 架构
- ✨ 初始化 Vue + Vite + Turborepo Monorepo 项目结构
- ✨ 配置 pnpm workspace 支持
- ✨ 配置 Turborepo 任务编排和缓存系统

#### 应用 (apps/)
- ✨ 创建 `apps/web` - Vue 3 Web 应用
  - Vue 3.5 + TypeScript
  - Vue Router 5.0
  - Pinia 3.0
  - Vite 7.3 构建工具

#### 公共包 (packages/)
- ✨ 创建 `packages/sdk1` - 工具函数库
  - `formatDate` - 日期格式化
  - `deepClone` - 深拷贝对象
  - `debounce` - 防抖函数
  - `throttle` - 节流函数
  - `generateId` - 生成唯一ID
  - `isEmpty` - 判断空值

- ✨ 创建 `packages/sdk2` - API 请求封装库
  - `HttpClient` - HTTP 客户端类
  - `createHttpClient` - 创建 HTTP 客户端实例
  - `storage` - 本地存储工具

#### 文档 (docs/)
- 📝 添加 Turborepo 完全指南 (`docs/turborepo-guide.md`)
- 📝 添加项目结构详细说明 (`docs/project-structure.md`)
- 📝 更新 README.md 为 Monorepo 项目说明

#### 配置文件
- ⚙️ 添加 `turbo.json` - Turborepo 配置（支持任务编排和缓存）
- ⚙️ 添加 `pnpm-workspace.yaml` - pnpm workspace 配置
- ⚙️ 添加 `.prettierrc` - 代码格式化配置
- ⚙️ 添加 `.env.example` - 环境变量示例
- ⚙️ 添加 `.gitignore` - Git 忽略规则

#### 示例代码
- 💡 在 `apps/web/src/views/HomeView.vue` 中添加 SDK 使用示例
  - 展示 SDK1 工具函数的使用
  - 展示 SDK2 HTTP 客户端和存储工具的使用

### Changed
- 🔄 重构项目结构为 Monorepo 架构
- 🔄 移动原有 Vue 应用代码到 `apps/web`
- 🔄 更新 TypeScript 配置支持项目引用（Project References）

### Technical Details

#### 构建系统
- 使用 Turborepo 进行任务编排和缓存管理
- 支持增量构建，只重新构建变更的包
- 支持并行构建，充分利用多核 CPU

#### 包管理
- 使用 pnpm workspace 管理包依赖
- 使用 `workspace:*` 协议引用内部包
- 共享开发依赖在根目录管理

#### TypeScript 配置
- 使用 Project References 进行类型检查
- 为每个包创建独立的 tsconfig.json
- 支持增量类型检查

### Dependencies

#### 根目录依赖
- `turbo@^2.4.4` - Monorepo 构建系统
- `typescript@~5.9.3` - TypeScript 编译器
- `@types/node@^24.12.0` - Node.js 类型定义
- `@tsconfig/node24@^24.0.4` - Node.js TypeScript 配置
- `@vue/tsconfig@^0.9.0` - Vue TypeScript 配置
- `prettier@^3.4.2` - 代码格式化工具

#### apps/web 依赖
- `vue@^3.5.30` - Vue 3 框架
- `vue-router@^5.0.3` - Vue Router
- `pinia@^3.0.4` - Pinia 状态管理
- `vite@^7.3.1` - Vite 构建工具
- 以及其他开发依赖

## [0.0.0] - 2026-03-31

### Added
- 🎉 项目初始化
- 基础 Vue 3 + Vite 项目结构
