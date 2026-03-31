# SDK 文档生成集成计划

## 项目背景

基于 [`jsdoc-template`](https://github.com/Sogrey/jsdoc-template) 项目，为 Vue-Vite-Monorepo 项目的 SDK1 和 SDK2 集成 JSDoc 文档生成功能。

## 目标

1. 为 SDK1（工具函数库）生成 JSDoc 文档
2. 为 SDK2（API 请求封装库）生成 JSDoc 文档
3. 复用文档模板，减少重复配置
4. 支持多 SDK 文档统一构建和管理

## 技术方案

### 目录结构设计

```
Vue-Vite-Monorepo/
├── packages/
│   ├── sdk1/                      # SDK1 源码
│   │   ├── src/
│   │   │   ├── index.ts           # 入口文件
│   │   │   └── *.ts               # 源码文件
│   │   └── package.json
│   └── sdk2/                      # SDK2 源码
│       ├── src/
│       │   ├── index.ts           # 入口文件
│       │   └── *.ts               # 源码文件
│       └── package.json
├── build/                         # 构建输出目录
│   ├── sdk1/                      # SDK1 构建产物
│   ├── sdk2/                      # SDK2 构建产物
│   ├── web/                       # Web 应用构建产物
│   ├── sdk1-doc/                  # SDK1 文档输出
│   └── sdk2-doc/                  # SDK2 文档输出
├── docs/                          # 项目文档目录
│   └── sdk-doc-generation-plan.md # 本计划文档
├── scripts/                       # 脚本目录
│   └── jsdoc/                     # JSDoc 相关
│       ├── jsdoc_template/        # 文档模板（共享）
│       ├── sdk1.conf.json         # SDK1 JSDoc 配置
│       ├── sdk2.conf.json         # SDK2 JSDoc 配置
│       └── generate-config.mjs    # 配置生成脚本
└── package.json                   # 根 package.json（添加文档生成脚本）
```

### 方案选择

**方案 A：集中式管理（推荐）**

- ✅ 优点：模板共享，统一管理，配置集中
- ❌ 缺点：需要修改根 package.json

**方案 B：分布式管理**

- ✅ 优点：每个 SDK 独立，不影响根配置
- ❌ 缺点：模板重复，维护成本高

**选择方案 A**，理由：

1. 两个 SDK 使用相同的文档模板，避免重复
2. 便于统一管理文档生成流程
3. 符合 Monorepo 架构理念

## 任务清单

### 阶段一：准备工作

- [x] **任务 1.1**：安装 JSDoc 相关依赖
  - 安装 `jsdoc` 和 `taffydb`
  - 安装 `jsdoc-babel` 和 Babel 相关依赖
  - 添加到根 package.json
- [x] **任务 1.2**：拷贝文档模板
  - 从 [`jsdoc-template/scripts/jsdoc/jsdoc_template/`](https://github.com/Sogrey/jsdoc-template/tree/main/scripts/jsdoc/jsdoc_template) 拷贝到 `scripts/jsdoc/jsdoc_template/`
  - 添加 `package.json` 配置 `"type": "commonjs"` 以解决 ES 模块问题
  - 模板支持 TypeScript 解析

- [x] **任务 1.3**：创建 JSDoc 配置文件
  - 创建 `scripts/jsdoc/sdk1.conf.json`
  - 创建 `scripts/jsdoc/sdk2.conf.json`
  - 配置源码路径和输出路径（`build/sdk1-doc/` 和 `build/sdk2-doc/`）
  - 配置 jsdoc-babel 插件解析 TypeScript

- [x] **任务 1.4**：创建配置生成脚本
  - 未创建单独脚本，直接使用 JSDoc 配置文件
  - 配置文件已包含所有必要配置

### 阶段二：SDK 源码准备

- [x] **任务 2.1**：检查 SDK1 源码
  - 确认所有函数都有 JSDoc 注释
  - 补充完整的 JSDoc 注释（@fileoverview, @module, @function, @param, @returns, @example）
  - 简化复杂 TypeScript 类型表达式以兼容 JSDoc

- [x] **任务 2.2**：检查 SDK2 源码
  - 确认所有函数和类都有 JSDoc 注释
  - 补充完整的 JSDoc 注释（@fileoverview, @module, @class, @constructor, @param, @returns, @example）
  - 简化复杂 TypeScript 类型表达式以兼容 JSDoc

### 阶段三：集成构建脚本

- [x] **任务 3.1**：添加 NPM 脚本
  - 在根 package.json 添加：
    - `docs:sdk1` - 生成 SDK1 文档
    - `docs:sdk2` - 生成 SDK2 文档
    - `docs:all` - 生成所有 SDK 文档
  - 在 `build:distribute` 脚本中集成文档生成

- [x] **任务 3.2**：创建文档构建脚本
  - 直接使用 JSDoc 命令行工具
  - 支持构建指定 SDK 文档或全部文档

### 阶段四：测试与优化

- [x] **任务 4.1**：测试 SDK1 文档生成
  - 运行 `pnpm docs:sdk1`
  - 检查文档输出
  - 验证文档可访问性

- [x] **任务 4.2**：测试 SDK2 文档生成
  - 运行 `pnpm docs:sdk2`
  - 检查文档输出
  - 验证文档可访问性

- [x] **任务 4.3**：测试统一构建
  - 运行 `pnpm docs:all`
  - 检查两个 SDK 文档是否都生成

- [ ] **任务 4.4**：文档模板优化（可选）
  - 调整模板样式以匹配项目主题
  - 添加项目 Logo
  - 调整颜色方案

### 阶段五：文档与维护

- [x] **任务 5.1**：更新项目文档
  - 更新 README.md，添加文档生成说明
  - 更新 CHANGELOG.md，记录文档生成集成
  - 更新 sdk-doc-generation-plan.md 任务完成状态

- [x] **任务 5.2**：配置 .gitignore
  - 已在 .gitignore 中配置忽略文档输出目录

- [ ] **任务 5.3**：集成到 CI/CD（可选）
  - 在 GitHub Actions 中添加文档生成步骤
  - 自动部署文档到 GitHub Pages

## JSDoc 注释规范

### 函数注释示例

```typescript
/**
 * 格式化日期
 * @param {Date|string} date - 日期对象或日期字符串
 * @param {string} format - 格式化模板，如 'YYYY-MM-DD HH:mm:ss'
 * @returns {string} 格式化后的日期字符串
 * @example
 * formatDate(new Date(), 'YYYY-MM-DD') // 返回 '2026-03-31'
 * formatDate('2026-03-31', 'YYYY年MM月DD日') // 返回 '2026年03月31日'
 */
export function formatDate(date: Date | string, format: string): string {
  // ...
}
```

### 类注释示例

```typescript
/**
 * HTTP 客户端类
 * @class HttpClient
 * @classdesc 封装 HTTP 请求，支持拦截器和超时配置
 */
export class HttpClient {
  /**
   * 创建 HTTP 客户端实例
   * @constructor
   * @param {Object} config - 配置选项
   * @param {string} config.baseURL - 基础 URL
   * @param {number} [config.timeout=5000] - 超时时间（毫秒）
   */
  constructor(config: { baseURL: string; timeout?: number }) {
    // ...
  }

  /**
   * 发送 GET 请求
   * @async
   * @param {string} url - 请求路径
   * @param {Object} [params] - 查询参数
   * @returns {Promise<any>} 响应数据
   */
  async get(url: string, params?: any): Promise<any> {
    // ...
  }
}
```

## 预期输出

### SDK1 文档结构

```
build/sdk1-doc/
├── index.html          # 文档首页
├── modules/            # 模块列表
├── classes/            # 类列表（如果有）
├── functions/          # 函数列表
│   ├── formatDate.html
│   ├── deepClone.html
│   ├── debounce.html
│   ├── throttle.html
│   ├── generateId.html
│   └── isEmpty.html
├── styles/             # 样式文件
├── scripts/            # 脚本文件
└── search.js           # 搜索功能
```

### SDK2 文档结构

```
build/sdk2-doc/
├── index.html          # 文档首页
├── modules/            # 模块列表
├── classes/            # 类列表
│   ├── HttpClient.html
│   └── Storage.html
├── functions/          # 函数列表
│   └── createHttpClient.html
├── styles/             # 样式文件
├── scripts/            # 脚本文件
└── search.js           # 搜索功能
```

## 风险与注意事项

1. **TypeScript 支持**
   - JSDoc 原生支持 JavaScript，对 TypeScript 的支持需要额外配置
   - 可能需要先将 TypeScript 编译为 JavaScript，或使用 `@tsdoc` 注释

2. **路径问题**
   - 确保配置文件中的路径正确
   - Windows 和 Linux 路径分隔符差异

3. **模板兼容性**
   - 检查模板是否支持 TypeScript 生成的文档
   - 可能需要调整模板以适配 TypeScript 类型定义

4. **依赖冲突**
   - 检查 jsdoc 版本与现有依赖是否冲突
   - 确保 pnpm workspace 依赖解析正确

## 参考资源

- [JSDoc 官方文档](https://jsdoc.app/)
- [TypeScript JSDoc 参考](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)
- [Vite 构建库模式](https://vitejs.dev/guide/build.html#library-mode)

## 时间估算

- 阶段一：准备工作 - 2 小时
- 阶段二：SDK 源码准备 - 1 小时
- 阶段三：集成构建脚本 - 1 小时
- 阶段四：测试与优化 - 1 小时
- 阶段五：文档与维护 - 0.5 小时

**总计：约 5.5 小时**

## 下一步行动

1. 确认任务清单，开始执行阶段一
2. 先完成 SDK1 的文档生成，验证流程
3. 再完成 SDK2 的文档生成
4. 最后统一优化和文档完善
