# Turborepo 完全指南

## 一、核心定位

**Turborepo 不是打包器，而是 Monorepo 场景下的高性能任务编排+缓存系统**，和 Webpack/Vite 定位完全不同；和 Nx/Lerna/Rush 是同赛道竞品，主打**极简配置、极致缓存、远程共享、零侵入**。

### 工具类型对比

| 工具类型 | 代表 | 核心能力 | 与 Turborepo 关系 |
| :--- | :--- | :--- | :--- |
| **模块打包器** | Webpack/Vite/Rspack | 把代码打包成可运行产物 | 互补：Turbo 调度它们，不替代 |
| **Monorepo 任务编排** | Turborepo/Nx/Lerna/Rush | 并行执行、增量构建、缓存 | 直接竞品 |

**一句话定位**：Turborepo = 多包项目的**任务调度器 + 全局缓存层**，底层仍用你现有的打包/编译工具。

---

## 二、与同赛道 Monorepo 工具对比

### 核心能力对比表

| 特性 | Turborepo | Nx | Lerna | Rush |
| :--- | :--- | :--- | :--- | :--- |
| **配置** | 极简（1 个 turbo.json） | 重、多文件、约束强 | 简单、功能弱 | 中、微软规范 |
| **本地缓存** | ✅ 内容哈希精准 | ✅ 智能 | ❌ 几乎无 | ✅ 基础 |
| **远程缓存** | ✅ Vercel 免费可用 | ✅ Nx Cloud 付费 | ❌ | ⚠️ 需自建 |
| **并行调度** | ✅ 全自动依赖图 | ✅ 复杂调度 | ⚠️ 有限 | ✅ |
| **增量构建** | ✅ 细粒度 | ✅ | ❌ | ✅ |
| **学习成本** | ⭐ | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| **适用** | 中小→大型、追求快+简 | 超大型、强管控 | 简单老项目 | 大型团队、强规范 |

### 关键差异速览

- **Turborepo vs Nx**
  - Turbo：**轻、快、无侵入**，只做任务+缓存，兼容现有脚本。
  - Nx：**全功能工程平台**，自带代码生成、可视化、插件生态，重但全能。

- **Turborepo vs Lerna**
  - Lerna 偏发包管理，**无有效缓存**，大项目极慢。
  - Turbo 直接覆盖 Lerna 能力，**速度提升 10～20 倍**。

- **Turborepo vs Rush**
  - Rush 微软出品，强管控、流程重；Turbo 轻量、开箱即用、无厂商锁定。

---

## 三、与打包工具的互补关系

Turborepo **不替代** Webpack/Vite，而是**加速它们**：

1. 你依然用 Webpack/Vite 做打包/转译/HMR。
2. Turbo 负责：
   - 按依赖顺序并行跑 build/lint/test。
   - 缓存结果，**不改就不重新构建**。
   - 团队/CI 共享远程缓存，一次构建处处复用。

**典型组合**：pnpm workspaces + Turborepo + Vite/Next.js。

---

## 四、核心优势

1. **内容哈希缓存**：比时间戳更准，输入不变直接复用产物。
2. **远程缓存**：团队/CI 共享，大幅降成本与时长。
3. **智能并行**：自动拆任务，吃满多核 CPU。
4. **零侵入**：兼容现有 package.json 脚本，移除不影响项目运行。
5. **极简上手**：npm i turbo → 写 turbo.json → 直接跑。

---

## 五、场景选型建议

### ✅ 选 Turborepo

- Monorepo 多包/多应用
- 想**极速构建、CI 成本减半**
- 配置简单、不想改现有架构

### ❌ 不选

- 单包小项目（收益不大）
- 需要**代码生成、强管控、全链路插件**（选 Nx）
- 纯打包需求（用 Vite/Rspack）

---

## 六、快速开始

### 1. 安装 Turbo

```bash
pnpm add turbo -Dw
# 或
npm install turbo -D
# 或
yarn add turbo -D
```

### 2. 根目录新建：turbo.json

```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "dev": {
      "cache": false,
      "persistent": true
    },
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", "build/**", ".next/**"]
    },
    "lint": {
      "outputs": []
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": []
    },
    "clean": {
      "cache": false
    }
  },
  "globalDependencies": ["tsconfig.json", ".eslintrc.json", ".prettierrc"]
}
```

### 3. 根 package.json 加脚本

```json
{
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "lint": "turbo lint",
    "test": "turbo test",
    "clean": "turbo clean && rm -rf node_modules/.cache/turbo"
  }
}
```

---

## 七、pnpm workspace 配置

### 根 pnpm-workspace.yaml

```yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

### 典型 Monorepo 目录结构

```
mono/
├── apps/           # 应用
│   ├── admin/      # 后台
│   └── web/        # 主站
├── packages/       # 公共包
│   ├── ui/         # 组件库
│   ├── utils/      # 工具函数
│   └── api/        # 请求封装
├── turbo.json
└── package.json
```

---

## 八、完整 turbo.json 配置示例

```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "dev": {
      "cache": false,
      "persistent": true
    },
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["src/**", "public/**", "package.json", "tsconfig.json", "vite.config.ts", "vue.config.js", "webpack.config.js"],
      "outputs": ["dist/**", "build/**", ".next/**", "out/**"]
    },
    "lint": {
      "outputs": []
    },
    "type-check": {
      "dependsOn": ["^build"],
      "outputs": []
    },
    "test": {
      "dependsOn": ["^build", "lint"],
      "outputs": []
    },
    "clean": {
      "cache": false
    }
  },
  "globalDependencies": [
    "tsconfig.json",
    "tsconfig.node.json",
    ".eslintrc.js",
    ".eslintignore",
    ".prettierrc",
    ".prettierignore"
  ],
  "globalEnv": ["NODE_ENV"],
  "globalPassThroughEnv": []
}
```

### 配置说明

1. **`"dependsOn": ["^build"]`**
   - `^` 代表：**先构建所有依赖的子包**，再构建自己
   - 比如 `web` 依赖 `ui`、`utils`，会自动先构建它们

2. **`inputs`**
   - 只有这些文件变化，才重新构建，更精准更快

3. **`outputs`**
   - 告诉 Turbo 要缓存哪些构建产物

4. **`dev: persistent: true`**
   - 表示是长服务（dev server），Turbo 不会等它结束

---

## 九、常用命令

```bash
# 所有应用 + 包一起 dev
pnpm dev

# 全量构建（会自动按依赖顺序构建）
pnpm build

# 只构建某个包（比如 packages/ui）
turbo build --filter=ui

# 只构建某个包 + 它依赖的包
turbo build --filter=web...

# 清空缓存
pnpm clean

# 并行跑 lint + build
turbo lint build

# 并行构建 + 类型检查
turbo build type-check
```

---

## 十、远程缓存配置

### 开启团队共享缓存

```bash
npx turbo login
npx turbo link
```

之后 CI/同事构建会直接复用缓存，速度提升非常明显。

---

## 十一、最佳实践

### 1. 任务命名规范
- 使用统一的标准任务名：`dev`、`build`、`lint`、`test`、`clean`
- 所有包都应实现这些脚本

### 2. 依赖管理
- 使用 pnpm workspace 协议引用内部包：`"ui": "workspace:*"`
- 明确声明依赖关系，避免循环依赖

### 3. 缓存策略
- `dev` 任务不缓存（`"cache": false`）
- `build` 任务明确 outputs（缓存产物）
- `lint/test` 任务不需要 outputs（只关心结果）

### 4. 全局依赖
- 将影响所有任务的配置文件加入 `globalDependencies`
- 如：tsconfig、eslint、prettier 配置

---

## 十二、总结

**Turborepo = 现代 Monorepo 标配的「任务加速器 + 全局缓存」**，和打包工具互补，和 Nx/Lerna/Rush 相比，胜在**极简、极速、零侵入**。
