# Changelog

All notable changes to this project will be documented in this file.

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
