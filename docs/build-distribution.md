# 构建产物分发指南

本文档说明如何使用构建产物分发功能进行版本发布。

## 📦 构建产物结构

执行构建分发后，所有构建产物会统一放在项目根目录的 `build` 目录下：

```
build/
├── sdk1/              # SDK1 构建产物
│   ├── index.js       # ES Module 代码
│   ├── index.js.map   # Source Map
│   ├── index.d.ts     # TypeScript 类型声明
│   └── index.d.ts.map # 类型声明 Source Map
├── sdk2/              # SDK2 构建产物
│   ├── index.js
│   ├── index.js.map
│   ├── index.d.ts
│   └── index.d.ts.map
└── web/               # Web 应用构建产物
    ├── assets/        # 静态资源（JS、CSS）
    ├── favicon.ico    # 网站图标
    └── index.html     # HTML 入口
```

## 🚀 使用方法

### 本地构建分发

```bash
# 构建并整理产物到 build 目录
pnpm build:distribute
```

这个命令会：
1. 执行 `turbo build` 构建所有包
2. 创建 `build` 目录
3. 将所有构建产物整理到 `build` 目录

### GitHub Actions 自动构建

每次推送到 `main` 分支或创建 Pull Request 时，GitHub Actions 会自动：

1. 构建所有包
2. 整理产物到 `build` 目录
3. 上传构建产物为 Artifacts（保留 30 天）
4. 生成构建摘要

## 📊 查看构建产物

### 本地查看

```bash
# 构建后查看
ls -R build/

# 或使用 tree 命令（如果可用）
tree build -L 2
```

### GitHub Actions 查看

1. 进入 GitHub 仓库
2. 点击 **Actions** 标签
3. 选择对应的工作流运行
4. 在 **Artifacts** 部分下载 `build-artifacts`

## 🔄 工作流程

### 开发阶段

```bash
# 正常开发构建（产物在各自的 dist 目录）
pnpm build
```

### 发布阶段

```bash
# 构建并整理产物（产物在 build 目录）
pnpm build:distribute

# 打包发布
cd build
tar -czf ../release.tar.gz *
```

## 📋 命令对比

| 命令 | 产物位置 | 用途 |
|------|---------|------|
| `pnpm build` | `packages/*/dist`, `apps/*/dist` | 开发时构建 |
| `pnpm build:distribute` | `build/` | 版本发布构建 |

## 🧹 清理构建产物

```bash
# 清理所有构建产物（包括 build 目录）
pnpm clean
```

这个命令会：
1. 清理各个包的 `dist` 目录
2. 清理 Turborepo 缓存
3. 清理 `build` 目录

## 🔄 GitHub Actions 工作流

### build-artifacts.yml

**触发条件：**
- 推送到 `main` 分支
- Pull Request 到 `main` 分支

**执行步骤：**
```yaml
1. Checkout 代码
2. 设置 Node.js 环境
3. 设置 pnpm 环境
4. 安装依赖
5. 构建所有包
6. 整理产物到 build 目录
7. 上传构建产物
8. 生成构建摘要
```

**产物保留：**
- Artifacts 保留 30 天
- 可在 Actions 页面手动下载

### deploy.yml

**触发条件：**
- 推送到 `main` 分支

**执行步骤：**
```yaml
1. Checkout 代码
2. 设置 Node.js 环境
3. 设置 pnpm 环境
4. 安装依赖
5. 构建所有包
6. 部署 web 应用到 GitHub Pages
```

**说明：**
- 仅部署 `apps/web/dist` 到 GitHub Pages
- 不影响其他包的构建产物

## 📦 版本发布流程

### 方式 1: 手动发布

```bash
# 1. 构建并整理产物
pnpm build:distribute

# 2. 创建发布包
cd build
tar -czf ../release-v1.0.0.tar.gz *

# 3. 上传到发布平台
# (如 GitHub Releases, npm, CDN 等)
```

### 方式 2: 使用 GitHub Actions 产物

```bash
# 1. 推送代码到 main 分支
git push

# 2. 等待 GitHub Actions 完成

# 3. 在 Actions 页面下载 build-artifacts

# 4. 解压并发布
unzip build-artifacts.zip
```

## 🔧 自定义配置

### 修改产物目录名称

编辑 `scripts/build-distribute.js`：

```javascript
const packages = [
  { name: 'sdk1', source: 'packages/sdk1/dist' },
  { name: 'sdk2', source: 'packages/sdk2/dist' },
  { name: 'web', source: 'apps/web/dist' },
  // 添加新的包
  { name: 'admin', source: 'apps/admin/dist' }
];
```

### 修改产物保留时间

编辑 `.github/workflows/build-artifacts.yml`：

```yaml
- name: Upload build artifacts
  uses: actions/upload-artifact@v4
  with:
    name: build-artifacts
    path: build/
    retention-days: 90  # 修改为 90 天
```

## 🎯 最佳实践

### 1. 构建前清理

```bash
# 确保干净的构建环境
pnpm clean
pnpm build:distribute
```

### 2. 验证构建产物

```bash
# 检查产物完整性
ls -la build/sdk1/
ls -la build/sdk2/
ls -la build/web/

# 检查类型声明文件
cat build/sdk1/index.d.ts
```

### 3. 版本号管理

```bash
# 在构建前更新版本号
# packages/sdk1/package.json
# packages/sdk2/package.json
# apps/web/package.json

# 然后构建
pnpm build:distribute
```

## 📚 相关文档

- [快速开始指南](./quick-start.md)
- [项目结构说明](./project-structure.md)
- [Vue + Vite 专属配置](./vue-vite-config.md)

## ❓ 常见问题

### Q: 为什么需要两个构建命令？

**A:** 
- `pnpm build`: 开发时构建，产物保留在各自的 `dist` 目录
- `pnpm build:distribute`: 发布时构建，产物整理到统一的 `build` 目录，便于分发

### Q: build 目录会被提交到 Git 吗？

**A:** 不会。`build` 目录已添加到 `.gitignore`，构建产物不会提交到版本控制。

### Q: 如何只构建某个特定的包？

**A:** 使用 Turborepo 的过滤器：
```bash
# 只构建 sdk1
turbo build --filter=sdk1

# 然后手动整理
mkdir -p build
cp -r packages/sdk1/dist build/sdk1
```

### Q: GitHub Actions 构建失败怎么办？

**A:** 
1. 检查 Actions 日志
2. 本地运行 `pnpm build:distribute` 确认是否成功
3. 检查依赖版本是否正确
4. 查看 TypeScript 错误：`pnpm type-check`

## 🎉 总结

构建产物分发功能提供了：

1. ✅ 统一的构建产物管理
2. ✅ 自动化的构建流程
3. ✅ 便于版本发布和分发
4. ✅ GitHub Actions 集成
5. ✅ 灵活的配置选项

现在你可以轻松地构建和分发你的 Monorepo 项目了！🚀
