# Vue + Vite + Monorepo 专属配置指南

本文档专门针对 Vue 3 + Vite 的 Monorepo 项目，提供最优的 Turborepo 配置方案。

## 项目结构（标准 Vue Monorepo）

```
vue-vite-monorepo/
├── apps/                  # 应用
│   ├── admin/             # Vue 后台（未来扩展）
│   └── web/               # Vue 主站
├── packages/              # 公共包
│   ├── sdk1/              # 工具函数库
│   ├── sdk2/              # API 请求封装库
│   ├── ui/                # Vue 组件库（未来扩展）
│   └── composables/       # 共享 hooks（未来扩展）
├── turbo.json             # Turborepo 配置
├── package.json
└── pnpm-workspace.yaml
```

---

## 完整 turbo.json 配置（Vue + Vite 专用）

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    // 开发服务（Vite dev）
    "dev": {
      "cache": false,
      "persistent": true,
      "dependsOn": ["^build"]
    },

    // 构建（Vite build）
    "build": {
      "dependsOn": ["^build"],
      "inputs": [
        "src/**",
        "public/**",
        "index.html",
        "package.json",
        "vite.config.ts",
        "tsconfig.json",
        "tsconfig.node.json",
        "env.d.ts"
      ],
      "outputs": ["dist/**"]
    },

    // 代码检查
    "lint": {
      "inputs": ["src/**/*.{vue,js,ts,jsx,tsx}"],
      "outputs": []
    },

    // TypeScript 类型检查
    "type-check": {
      "dependsOn": ["^build"],
      "inputs": ["src/**/*.{vue,ts,tsx}"],
      "outputs": []
    },

    // 测试
    "test": {
      "dependsOn": ["^build", "lint"],
      "outputs": []
    },

    // 清理
    "clean": {
      "cache": false
    }
  },

  // 全局配置文件（修改后全量重新构建）
  "globalDependencies": [
    "tsconfig.json",
    "tsconfig.node.json",
    ".eslintrc.js",
    ".eslintignore",
    ".prettierrc",
    ".prettierignore",
    "vite.config.ts"
  ],

  // 环境变量
  "globalEnv": ["NODE_ENV", "VITE_APP_TITLE", "VITE_API_BASEURL"]
}
```

---

## 根目录 package.json

```json
{
  "name": "vue-vite-monorepo",
  "private": true,
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "lint": "turbo lint",
    "type-check": "turbo type-check",
    "test": "turbo test",
    "clean": "turbo clean && rm -rf node_modules/.cache/turbo"
  },
  "devDependencies": {
    "turbo": "^2.4.4"
  }
}
```

---

## 子包/子应用的 package.json 配置

### Vue 应用（apps/web）

```json
{
  "name": "web",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "run-p type-check \"build-only {@}\" --",
    "build-only": "vite build",
    "preview": "vite preview",
    "type-check": "vue-tsc --build",
    "lint": "run-s lint:*",
    "lint:oxlint": "oxlint . --fix",
    "lint:eslint": "eslint . --fix --cache",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "vue": "^3.5.30",
    "vue-router": "^5.0.3",
    "pinia": "^3.0.4"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^6.0.4",
    "vite": "^7.3.1",
    "vue-tsc": "^3.2.5",
    "typescript": "~5.9.3"
  }
}
```

### SDK 包（packages/sdk1）

```json
{
  "name": "@vue-vite-monorepo/sdk1",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "dev": "vite build --watch",
    "build": "vite build && tsc --emitDeclarationOnly",
    "type-check": "tsc --noEmit",
    "lint": "eslint src --ext .ts",
    "clean": "rm -rf dist"
  }
}
```

---

## 最常用命令

### 开发命令

```bash
# 启动所有 Vue 应用
pnpm dev

# 只启动 web 应用
turbo dev --filter=web

# 只启动 admin 应用
turbo dev --filter=admin
```

### 构建命令

```bash
# 构建所有项目（自动按依赖顺序）
pnpm build

# 只构建 web 应用
turbo build --filter=web

# 只构建 admin + 它依赖的公共包
turbo build --filter=admin...

# 只构建某个 SDK 包
turbo build --filter=sdk1
```

### 检查命令

```bash
# 类型检查 + 构建 一起跑
turbo type-check build

# 代码检查
pnpm lint

# 只检查某个应用
turbo lint --filter=web

# 类型检查
pnpm type-check
```

### 清理命令

```bash
# 清理所有构建产物
pnpm clean

# 清理某个包
turbo clean --filter=sdk1
```

---

## 为什么这个配置适合 Vue + Vite？

### 1. 精准缓存

只监听 Vue/Vite 相关文件，不浪费性能：

- `src/**` - 源代码
- `public/**` - 静态资源
- `index.html` - HTML 入口
- `vite.config.ts` - Vite 配置
- `tsconfig.json` - TypeScript 配置
- `env.d.ts` - 环境变量类型定义

### 2. 依赖自动处理

`"dependsOn": ["^build"]` 确保：
- web 依赖 ui → 自动先构建 ui
- admin 依赖 utils → 自动先构建 utils
- 所有依赖关系自动处理，无需手动排序

### 3. 类型检查支持

内置 `vue-tsc` 支持，完美适配 Vue 3 + TypeScript：

```json
"type-check": {
  "dependsOn": ["^build"],
  "inputs": ["src/**/*.{vue,ts,tsx}"],
  "outputs": []
}
```

### 4. Vite 产物规范

只缓存 `dist`，符合 Vite 输出规范：

```json
"outputs": ["dist/**"]
```

### 5. 开发模式优化

```json
"dev": {
  "cache": false,
  "persistent": true,
  "dependsOn": ["^build"]
}
```

- `cache: false` - 开发模式不缓存
- `persistent: true` - 长进程服务
- `dependsOn: ["^build"]` - 确保依赖包先构建

---

## 配置详解

### dev 任务

```json
"dev": {
  "cache": false,        // 不缓存开发模式
  "persistent": true,    // 长进程（dev server）
  "dependsOn": ["^build"] // 先构建依赖包
}
```

**为什么需要 `dependsOn: ["^build"]`？**

如果 web 应用依赖 `packages/sdk1`，启动 dev 前会先构建 sdk1，确保开发时能正确引用。

### build 任务

```json
"build": {
  "dependsOn": ["^build"],
  "inputs": [
    "src/**",           // Vue 源码
    "public/**",        // 静态资源
    "index.html",       // HTML 入口
    "package.json",     // 依赖配置
    "vite.config.ts",   // Vite 配置
    "tsconfig.json",    // TS 配置
    "tsconfig.node.json", // Node TS 配置
    "env.d.ts"          // 环境变量类型
  ],
  "outputs": ["dist/**"] // 只缓存 dist
}
```

**inputs 详解：**
- 只包含实际影响构建的文件
- 避免不必要的重新构建
- 精准的缓存失效机制

### lint 任务

```json
"lint": {
  "inputs": ["src/**/*.{vue,js,ts,jsx,tsx}"],
  "outputs": []
}
```

**只检查源代码文件：**
- `.vue` - Vue 单文件组件
- `.js/.ts` - JavaScript/TypeScript
- `.jsx/.tsx` - JSX/TSX

### type-check 任务

```json
"type-check": {
  "dependsOn": ["^build"],  // 先构建依赖包
  "inputs": ["src/**/*.{vue,ts,tsx}"],
  "outputs": []             // 不缓存结果
}
```

**为什么需要 `dependsOn: ["^build"]`？**

类型检查需要依赖包的类型声明文件（`.d.ts`），所以先构建依赖包。

### globalDependencies

```json
"globalDependencies": [
  "tsconfig.json",         // TS 全局配置
  "tsconfig.node.json",    // Node TS 配置
  ".eslintrc.js",          // ESLint 配置
  ".eslintignore",         // ESLint 忽略
  ".prettierrc",           // Prettier 配置
  ".prettierignore",       // Prettier 忽略
  "vite.config.ts"         // Vite 配置
]
```

**这些文件变更会影响所有任务：**
- 修改 `tsconfig.json` → 所有包重新构建
- 修改 `vite.config.ts` → 所有包重新构建

### globalEnv

```json
"globalEnv": [
  "NODE_ENV",              // Node 环境
  "VITE_APP_TITLE",        // 应用标题
  "VITE_API_BASEURL"       // API 基础路径
]
```

**环境变量变更也会触发重新构建：**
- 修改 `.env` 文件 → 重新构建
- 添加新的环境变量 → 更新 `globalEnv`

---

## 实战示例

### 场景 1: 添加新的 Vue 应用

```bash
# 1. 创建目录
mkdir apps/admin

# 2. 创建 package.json（复制 apps/web/package.json）
# 3. 创建必要的配置文件
# 4. 安装依赖
pnpm install

# 5. 启动
turbo dev --filter=admin
```

### 场景 2: 添加新的公共包

```bash
# 1. 创建目录
mkdir packages/ui

# 2. 创建 package.json
{
  "name": "@vue-vite-monorepo/ui",
  "version": "0.0.1",
  "scripts": {
    "dev": "vite build --watch",
    "build": "vite build && tsc --emitDeclarationOnly",
    "type-check": "tsc --noEmit",
    "clean": "rm -rf dist"
  }
}

# 3. 在 Vue 应用中使用
{
  "dependencies": {
    "@vue-vite-monorepo/ui": "workspace:*"
  }
}

# 4. 安装依赖
pnpm install

# 5. 自动按依赖顺序构建
pnpm build
```

### 场景 3: 增量构建测试

```bash
# 第一次构建（全部重新构建）
pnpm build
# Time: 5.14s

# 没有修改任何文件
pnpm build
# Time: 72ms >>> FULL TURBO (全部命中缓存)

# 修改 packages/sdk1/src/index.ts
pnpm build
# ⚡ 只重新构建 sdk1 和依赖它的应用
```

---

## 常见问题

### Q: 为什么 dev 需要依赖 build？

**A:** 确保开发时引用的依赖包已构建。例如 web 应用依赖 sdk1，启动 dev 前会先构建 sdk1。

### Q: inputs 为什么不包含 node_modules？

**A:** Turborepo 自动处理依赖变更。`package.json` 和 `pnpm-lock.yaml` 变更时会自动触发重新构建。

### Q: outputs 为什么只有 dist？

**A:** Vite 的构建产物只有 `dist` 目录。不像 Webpack 可能有 `build` 或其他目录。

### Q: 如何添加新的环境变量？

**A:** 
1. 在 `.env` 文件中添加
2. 在 `turbo.json` 的 `globalEnv` 中添加
3. 在 `env.d.ts` 中添加类型定义

### Q: 如何调试缓存问题？

**A:** 
```bash
# 查看缓存详情
turbo build --dry-run

# 清除所有缓存
pnpm clean

# 强制重新构建
turbo build --force
```

---

## 性能优化建议

### 1. 精简 inputs

只包含实际需要的文件，避免不必要的重新构建。

### 2. 合理使用缓存

- `dev` 不缓存
- `build` 缓存产物
- `lint` 不缓存结果

### 3. 并行执行

```bash
# 并行执行 type-check 和 lint
turbo type-check lint
```

### 4. 使用过滤器

```bash
# 只构建需要的包
turbo build --filter=web
```

---

## 总结

这个 Vue + Vite 专属配置具有以下优势：

1. ✅ **精准缓存** - 只监听 Vue/Vite 相关文件
2. ✅ **自动依赖** - 自动处理包之间的依赖关系
3. ✅ **类型安全** - 完美支持 Vue 3 + TypeScript
4. ✅ **性能极致** - 增量构建 + 并行执行
5. ✅ **易于扩展** - 可轻松添加新的应用和包

配置已针对 Vue + Vite 项目优化，可直接使用！🚀
