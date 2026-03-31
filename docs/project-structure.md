# 项目结构说明

本文档详细说明 Monorepo 项目的目录结构和各个部分的作用。

## 根目录结构

```
vue-vite-monorepo/
├── apps/                    # 应用目录
│   └── web/                 # Web 应用
├── packages/                # 公共包目录
│   ├── sdk1/                # SDK1 - 工具函数库
│   └── sdk2/                # SDK2 - API 请求封装库
├── docs/                    # 文档目录
├── public/                  # 静态资源目录（根级别）
├── turbo.json               # Turborepo 配置
├── pnpm-workspace.yaml      # pnpm workspace 配置
├── package.json             # 根 package.json
├── tsconfig.json            # TypeScript 根配置
├── tsconfig.node.json       # Node.js 环境的 TypeScript 配置
├── .eslintrc.cjs            # ESLint 配置（可选）
├── .prettierrc              # Prettier 配置
├── .gitignore               # Git 忽略文件
├── .env.example             # 环境变量示例
└── README.md                # 项目说明文档
```

## apps/web 目录结构

Web 应用的目录结构：

```
apps/web/
├── public/                  # 静态资源
│   └── favicon.ico         # 网站图标
├── src/                    # 源代码
│   ├── assets/             # 资源文件（图片、字体等）
│   ├── components/         # Vue 组件
│   ├── router/             # 路由配置
│   ├── stores/             # Pinia 状态管理
│   ├── views/              # 页面视图
│   ├── App.vue             # 根组件
│   └── main.ts             # 入口文件
├── dist/                   # 构建产物（自动生成）
├── package.json            # 应用依赖配置
├── vite.config.ts          # Vite 配置
├── tsconfig.json           # TypeScript 配置
├── tsconfig.app.json       # 应用 TypeScript 配置
├── tsconfig.node.json      # Node.js TypeScript 配置
├── env.d.ts                # 环境变量类型定义
└── index.html              # HTML 模板
```

## packages/sdk1 目录结构

SDK1 - 工具函数库：

```
packages/sdk1/
├── src/                    # 源代码
│   └── index.ts           # 导出所有工具函数
├── dist/                   # 构建产物（自动生成）
│   ├── index.js           # 编译后的 JS 文件
│   ├── index.d.ts         # 类型声明文件
│   ├── index.js.map       # Source Map
│   └── index.d.ts.map     # 类型 Source Map
├── package.json            # 包配置
├── tsconfig.json           # TypeScript 配置
└── vite.config.ts          # Vite 库模式配置
```

**提供的工具函数：**
- `formatDate` - 日期格式化
- `deepClone` - 深拷贝对象
- `debounce` - 防抖函数
- `throttle` - 节流函数
- `generateId` - 生成唯一ID
- `isEmpty` - 判断空值

## packages/sdk2 目录结构

SDK2 - API 请求封装库：

```
packages/sdk2/
├── src/                    # 源代码
│   └── index.ts           # 导出 HTTP 客户端和存储工具
├── dist/                   # 构建产物（自动生成）
│   ├── index.js           # 编译后的 JS 文件
│   ├── index.d.ts         # 类型声明文件
│   ├── index.js.map       # Source Map
│   └── index.d.ts.map     # 类型 Source Map
├── package.json            # 包配置
├── tsconfig.json           # TypeScript 配置
└── vite.config.ts          # Vite 库模式配置
```

**提供的功能：**
- `HttpClient` - HTTP 客户端类
- `createHttpClient` - 创建 HTTP 客户端实例
- `storage` - 本地存储工具

## docs 目录结构

文档目录：

```
docs/
├── turborepo-guide.md      # Turborepo 完全指南
└── project-structure.md    # 项目结构说明（本文件）
```

## 关键配置文件说明

### turbo.json

Turborepo 的任务配置，定义了 monorepo 中的任务执行流程：

- `dev` - 开发模式，不缓存，长进程
- `build` - 构建任务，先构建依赖包，再构建当前包
- `lint` - 代码检查
- `type-check` - 类型检查
- `test` - 测试
- `clean` - 清理构建产物

### pnpm-workspace.yaml

定义 pnpm workspace 的包路径：

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

### package.json（根目录）

根目录的 package.json 主要用于：

1. 定义 monorepo 级别的脚本
2. 安装共享的开发依赖
3. 管理 Turborepo

### tsconfig.json

TypeScript 项目引用配置，使用复合项目（Project References）：

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.node.json" },
    { "path": "./apps/web/tsconfig.app.json" }
  ]
}
```

## 依赖管理

### workspace 协议

在 apps/web 中引用内部包时使用 `workspace:*` 协议：

```json
{
  "dependencies": {
    "@vue-vite-monorepo/sdk1": "workspace:*",
    "@vue-vite-monorepo/sdk2": "workspace:*"
  }
}
```

### 共享依赖

以下依赖在根目录管理，所有子包共享：

- TypeScript
- ESLint / Prettier
- @types/node
- @tsconfig/node24

### 应用专属依赖

每个应用或包可以有自己专属的依赖：

- `apps/web` - Vue、Vue Router、Pinia 等
- `packages/sdk1` - 纯工具函数，无运行时依赖
- `packages/sdk2` - 纯 API 封装，无运行时依赖

## 构建流程

### 开发模式

```bash
pnpm dev
```

Turborepo 会：
1. 并行启动所有包的 dev 脚本
2. SDK 包会以 watch 模式构建
3. Web 应用启动 Vite 开发服务器

### 生产构建

```bash
pnpm build
```

Turborepo 会：
1. 分析依赖图
2. 先构建 `packages/sdk1` 和 `packages/sdk2`（并行）
3. 再构建 `apps/web`（依赖 SDK 包）
4. 所有构建产物会被缓存

### 增量构建

如果只修改了 `packages/sdk1`：

```bash
pnpm build
```

Turborepo 会：
1. 检测到 `packages/sdk2` 和 `apps/web` 的输入未变化
2. 直接使用缓存
3. 只重新构建 `packages/sdk1`

## 添加新包

### 1. 创建目录

```bash
mkdir packages/new-sdk
```

### 2. 创建 package.json

```json
{
  "name": "@vue-vite-monorepo/new-sdk",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "dev": "vite build --watch",
    "build": "vite build && tsc --emitDeclarationOnly"
  }
}
```

### 3. 创建其他必要文件

- `tsconfig.json`
- `vite.config.ts`
- `src/index.ts`

### 4. 安装依赖

```bash
pnpm install
```

### 5. 在其他包中使用

```json
{
  "dependencies": {
    "@vue-vite-monorepo/new-sdk": "workspace:*"
  }
}
```

## 添加新应用

### 1. 创建目录

```bash
mkdir apps/admin
```

### 2. 复制或创建应用结构

参考 `apps/web` 的结构创建新应用。

### 3. 安装依赖

```bash
pnpm install
```

### 4. 使用 Turbo 过滤器

只启动特定应用：

```bash
turbo dev --filter=admin
```

## 常见问题

### Q: 如何只构建某个包？

```bash
turbo build --filter=sdk1
```

### Q: 如何只构建某个包及其依赖？

```bash
turbo build --filter=web...
```

### Q: 如何清除所有缓存？

```bash
pnpm clean
```

### Q: 如何查看构建缓存？

```bash
turbo build --dry-run
```

### Q: 如何在 CI 中使用远程缓存？

```bash
npx turbo login
npx turbo link
```

## 最佳实践

1. **明确依赖关系** - 在 package.json 中明确声明包之间的依赖
2. **统一版本管理** - 在根目录管理共享依赖的版本
3. **合理使用缓存** - 不要缓存 `dev` 任务，合理设置 `outputs`
4. **原子提交** - 跨多个包的更改应该在一次提交中完成
5. **文档同步** - 包的功能变更应及时更新文档
