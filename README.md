# Vue + Vite + Turborepo Monorepo 模板

这是一个基于 Vue 3 + Vite + Turborepo 构建的 Monorepo 多包/多应用模板项目。

## 📚 文档导航

- **[快速开始指南](./docs/quick-start.md)** - 5 分钟快速上手
- **[构建产物分发指南](./docs/build-distribution.md)** - 版本发布和产物分发 🆕
- **[Vue + Vite 专属配置](./docs/vue-vite-config.md)** - 针对 Vue + Vite 的最佳实践配置 ⭐
- **[项目结构说明](./docs/project-structure.md)** - 详细的目录结构和配置说明
- **[Turborepo 完全指南](./docs/turborepo-guide.md)** - Turborepo 深度解析
- **[配置优化记录](./docs/config-optimization.md)** - 配置优化详情
- **[项目完成总结](./docs/project-summary.md)** - 项目完成总结

## 项目结构

```
vue-vite-monorepo/
├── apps/                    # 应用目录
│   └── web/                 # Web 应用（Vue 3）
├── packages/                # 公共包目录
│   ├── sdk1/                # SDK1 - 工具函数库
│   └── sdk2/                # SDK2 - API 请求封装库
├── docs/                    # 文档目录
│   ├── quick-start.md       # 快速开始指南
│   ├── vue-vite-config.md   # Vue + Vite 专属配置 ⭐
│   ├── project-structure.md # 项目结构说明
│   ├── turborepo-guide.md   # Turborepo 完全指南
│   ├── config-optimization.md # 配置优化记录
│   └── project-summary.md   # 项目完成总结
├── turbo.json               # Turborepo 配置
├── pnpm-workspace.yaml      # pnpm workspace 配置
└── package.json             # 根 package.json
```

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **Vite** - 下一代前端构建工具
- **Turborepo** - 高性能 Monorepo 构建系统
- **TypeScript** - JavaScript 的超集
- **pnpm** - 快速、节省磁盘空间的包管理器

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
# 启动所有应用和包的开发模式
pnpm dev

# 只启动 web 应用
pnpm dev --filter=web
```

### 构建

```bash
# 构建所有应用和包
pnpm build

# 只构建某个包
turbo build --filter=sdk1
```

### 其他命令

```bash
# 代码检查
pnpm lint

# 类型检查
pnpm type-check

# 清理构建产物
pnpm clean

# 格式化代码
pnpm format
```

## 包说明

### apps/web

主 Web 应用，使用 Vue 3 + Vite + TypeScript 构建。

- 开发服务器：`pnpm dev --filter=web`
- 构建：`turbo build --filter=web`

### packages/sdk1

工具函数库，提供常用的工具函数：

- `formatDate` - 日期格式化
- `deepClone` - 深拷贝
- `debounce` - 防抖
- `throttle` - 节流
- `generateId` - 生成唯一ID
- `isEmpty` - 判断空值

### packages/sdk2

API 请求封装库，提供：

- `HttpClient` - HTTP 客户端类
- `createHttpClient` - 创建 HTTP 客户端
- `storage` - 本地存储工具

## Monorepo 优势

1. **代码共享** - 多个应用可以共享公共代码
2. **统一依赖** - 统一管理依赖版本
3. **原子提交** - 跨多个包的更改可以在一次提交中完成
4. **增量构建** - Turborepo 智能缓存，只重新构建更改的包
5. **并行执行** - 自动并行执行任务，提高构建速度

## Turborepo 特性

- ✅ **本地缓存** - 基于内容哈希的精准缓存
- ✅ **远程缓存** - 团队共享缓存，加速 CI/CD
- ✅ **智能并行** - 自动并行执行独立任务
- ✅ **增量构建** - 只构建变更的包
- ✅ **零侵入** - 兼容现有 npm 脚本

## 文档

详细的 Turborepo 使用指南请查看：[docs/turborepo-guide.md](./docs/turborepo-guide.md)

## 开发规范

### 包依赖管理

在 `apps/web` 中使用 workspace 协议引用内部包：

```json
{
  "dependencies": {
    "@vue-vite-monorepo/sdk1": "workspace:*",
    "@vue-vite-monorepo/sdk2": "workspace:*"
  }
}
```

### 构建顺序

Turborepo 会自动分析依赖关系，按照正确的顺序构建：

1. 先构建 `packages/sdk1` 和 `packages/sdk2`
2. 再构建 `apps/web`

### 添加新包

1. 在 `packages/` 目录下创建新包
2. 添加 `package.json`、`tsconfig.json`、`vite.config.ts`
3. 在根 `pnpm-workspace.yaml` 中已自动包含
4. 运行 `pnpm install` 安装依赖

## License

MIT
