#!/usr/bin/env node

/**
 * 构建并整理产物到 build 目录
 * 用于版本分发
 */

import { execSync } from 'child_process'
import { existsSync, mkdirSync, cpSync, rmSync, readdirSync, statSync } from 'fs'
import { resolve, join } from 'path'

const rootDir = resolve(process.cwd())
const buildDir = resolve(rootDir, 'build')

console.log('📦 开始构建并整理产物...\n')

// 1. 生成文档
console.log('📄 生成 SDK 文档...')
try {
  execSync('pnpm docs:all', { stdio: 'inherit', cwd: rootDir })
  console.log('✅ 文档生成完成\n')
} catch {
  console.error('❌ 文档生成失败')
  process.exit(1)
}

// 2. 执行构建
console.log('🔨 执行构建...')
try {
  execSync('turbo build', { stdio: 'inherit', cwd: rootDir })
  console.log('✅ 构建完成\n')
} catch {
  console.error('❌ 构建失败')
  process.exit(1)
}

// 3. 创建 build 目录（保留文档目录）
console.log('📁 创建 build 目录...')
if (existsSync(buildDir)) {
  console.log('  清理旧的 build 目录（保留文档）...')
  // 只删除非文档目录
  const items = readdirSync(buildDir)
  items.forEach((item) => {
    const itemPath = resolve(buildDir, item)
    const stat = statSync(itemPath)
    if (stat.isDirectory() && !item.includes('-doc')) {
      rmSync(itemPath, { recursive: true, force: true })
    }
  })
}
mkdirSync(buildDir, { recursive: true })
console.log('✅ build 目录创建完成\n')

// 3. 移动构建产物
console.log('📦 整理构建产物...')

const packages = [
  { name: 'sdk1', source: 'packages/sdk1/dist' },
  { name: 'sdk2', source: 'packages/sdk2/dist' },
  { name: 'web', source: 'apps/web/dist' },
]

packages.forEach((pkg) => {
  const sourcePath = resolve(rootDir, pkg.source)
  const targetPath = resolve(buildDir, pkg.name)

  if (existsSync(sourcePath)) {
    console.log(`  ✅ 移动 ${pkg.name}: ${pkg.source} -> build/${pkg.name}`)
    cpSync(sourcePath, targetPath, { recursive: true })
  } else {
    console.log(`  ⚠️  跳过 ${pkg.name}: 源目录不存在 (${pkg.source})`)
  }
})

// 4. 复制 SDK 文档
console.log('\n📄 复制 SDK 文档...')
const docs = [
  { name: 'sdk1-doc', source: 'build/sdk1-doc' },
  { name: 'sdk2-doc', source: 'build/sdk2-doc' },
]

docs.forEach((doc) => {
  const sourcePath = resolve(rootDir, doc.source)
  const targetPath = resolve(buildDir, 'web', 'docs', doc.name)

  if (existsSync(sourcePath)) {
    console.log(`  ✅ 复制 ${doc.name}: ${doc.source} -> build/web/docs/${doc.name}`)
    cpSync(sourcePath, targetPath, { recursive: true })
  } else {
    console.log(`  ⚠️  跳过 ${doc.name}: 文档不存在 (${doc.source})，请先运行 pnpm docs:all`)
  }
})

console.log('\n📊 构建产物结构:')
function printTree(dir, prefix = '', maxDepth = 2, currentDepth = 0) {
  if (currentDepth >= maxDepth) return

  const items = readdirSync(dir)
  items.forEach((item, index) => {
    const itemPath = join(dir, item)
    const isLast = index === items.length - 1
    const connector = isLast ? '└── ' : '├── '
    console.log(prefix + connector + item)

    if (statSync(itemPath).isDirectory()) {
      const newPrefix = prefix + (isLast ? '    ' : '│   ')
      printTree(itemPath, newPrefix, maxDepth, currentDepth + 1)
    }
  })
}

try {
  console.log('build/')
  printTree(buildDir)
} catch {
  console.log('  (无法显示目录结构)')
}

console.log('✨ 构建产物整理完成！')
console.log(`📂 产物位置: ${buildDir}\n`)
