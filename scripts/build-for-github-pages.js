#!/usr/bin/env node

/**
 * 为 GitHub Pages 构建和部署准备
 * 确保文档正确复制到构建产物中
 */

import { execSync } from 'child_process'
import { existsSync, cpSync, rmSync } from 'fs'
import { resolve } from 'path'

const rootDir = resolve(process.cwd())

console.log('🚀 开始为 GitHub Pages 构建...\n')

// 1. 生成 SDK 文档
console.log('📄 生成 SDK 文档...')
try {
  execSync('pnpm docs:all', { stdio: 'inherit', cwd: rootDir })
  console.log('✅ SDK 文档生成完成\n')
} catch (error) {
  console.error('❌ SDK 文档生成失败')
  process.exit(1)
}

// 2. 构建 Web 应用
console.log('🔨 构建 Web 应用...')
try {
  execSync('turbo build --filter=web', { stdio: 'inherit', cwd: rootDir })
  console.log('✅ Web 应用构建完成\n')
} catch (error) {
  console.error('❌ Web 应用构建失败')
  process.exit(1)
}

// 3. 复制构建产物到 build 目录
console.log('📦 整理构建产物...')
const buildDir = resolve(rootDir, 'build')
const webDistDir = resolve(rootDir, 'apps', 'web', 'dist')
const buildWebDir = resolve(buildDir, 'web')

// 清理并创建 build 目录
if (existsSync(buildWebDir)) {
  console.log('  清理旧的 build/web 目录...')
  rmSync(buildWebDir, { recursive: true, force: true })
}

// 复制 web 构建产物
if (existsSync(webDistDir)) {
  console.log('  ✅ 复制 web 构建产物到 build/web')
  cpSync(webDistDir, buildWebDir, { recursive: true })
} else {
  console.error('  ❌ web 构建产物不存在')
  process.exit(1)
}

console.log('\n✨ GitHub Pages 构建完成！')
console.log(`📂 产物位置: ${buildWebDir}`)
console.log('\n💡 提示: 将 build/web 目录部署到 GitHub Pages 即可\n')
