/**
 * 复制 SDK 文档到 Web 应用的 public 目录
 * 用于开发和生产环境访问
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 项目根目录
const rootDir = path.resolve(__dirname, '..')

// 源文档目录
const sdk1DocSource = path.join(rootDir, 'build', 'sdk1-doc')
const sdk2DocSource = path.join(rootDir, 'build', 'sdk2-doc')

// 目标文档目录
const publicDocsDir = path.join(rootDir, 'apps', 'web', 'public', 'docs')
const sdk1DocTarget = path.join(publicDocsDir, 'sdk1-doc')
const sdk2DocTarget = path.join(publicDocsDir, 'sdk2-doc')

/**
 * 递归复制目录
 */
function copyDir(src, dest) {
  // 如果源目录不存在，跳过
  if (!fs.existsSync(src)) {
    console.log(`⚠️  源目录不存在: ${src}`)
    return false
  }

  // 创建目标目录
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true })
  }

  // 读取源目录
  const entries = fs.readdirSync(src, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }

  return true
}

/**
 * 清理目录
 */
function cleanDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true })
  }
}

console.log('📦 开始复制 SDK 文档...\n')

// 清理旧文档
console.log('🧹 清理旧文档...')
cleanDir(publicDocsDir)

// 复制 SDK1 文档
console.log('📄 复制 SDK1 文档...')
if (copyDir(sdk1DocSource, sdk1DocTarget)) {
  console.log('✅ SDK1 文档复制成功')
} else {
  console.log('❌ SDK1 文档复制失败，请先运行 pnpm docs:sdk1')
}

// 复制 SDK2 文档
console.log('📄 复制 SDK2 文档...')
if (copyDir(sdk2DocSource, sdk2DocTarget)) {
  console.log('✅ SDK2 文档复制成功')
} else {
  console.log('❌ SDK2 文档复制失败，请先运行 pnpm docs:sdk2')
}

console.log('\n✨ 文档复制完成！')
console.log(`📂 文档位置: ${publicDocsDir}`)
