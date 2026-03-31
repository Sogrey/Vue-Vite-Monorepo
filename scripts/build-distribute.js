#!/usr/bin/env node

/**
 * 构建并整理产物到 build 目录
 * 用于版本分发
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, cpSync, rmSync, readdirSync, statSync } from 'fs';
import { resolve, join } from 'path';

const rootDir = resolve(process.cwd());
const buildDir = resolve(rootDir, 'build');

console.log('📦 开始构建并整理产物...\n');

// 1. 执行构建
console.log('🔨 执行构建...');
try {
  execSync('turbo build', { stdio: 'inherit', cwd: rootDir });
  console.log('✅ 构建完成\n');
} catch (error) {
  console.error('❌ 构建失败');
  process.exit(1);
}

// 2. 创建 build 目录
console.log('📁 创建 build 目录...');
if (existsSync(buildDir)) {
  console.log('  清理旧的 build 目录...');
  rmSync(buildDir, { recursive: true, force: true });
}
mkdirSync(buildDir, { recursive: true });
console.log('✅ build 目录创建完成\n');

// 3. 移动构建产物
console.log('📦 整理构建产物...');

const packages = [
  { name: 'sdk1', source: 'packages/sdk1/dist' },
  { name: 'sdk2', source: 'packages/sdk2/dist' },
  { name: 'web', source: 'apps/web/dist' }
];

packages.forEach(pkg => {
  const sourcePath = resolve(rootDir, pkg.source);
  const targetPath = resolve(buildDir, pkg.name);

  if (existsSync(sourcePath)) {
    console.log(`  ✅ 移动 ${pkg.name}: ${pkg.source} -> build/${pkg.name}`);
    cpSync(sourcePath, targetPath, { recursive: true });
  } else {
    console.log(`  ⚠️  跳过 ${pkg.name}: 源目录不存在 (${pkg.source})`);
  }
});

console.log('\n📊 构建产物结构:');
function printTree(dir, prefix = '', maxDepth = 2, currentDepth = 0) {
  if (currentDepth >= maxDepth) return;
  
  const items = readdirSync(dir);
  items.forEach((item, index) => {
    const itemPath = join(dir, item);
    const isLast = index === items.length - 1;
    const connector = isLast ? '└── ' : '├── ';
    console.log(prefix + connector + item);
    
    if (statSync(itemPath).isDirectory()) {
      const newPrefix = prefix + (isLast ? '    ' : '│   ');
      printTree(itemPath, newPrefix, maxDepth, currentDepth + 1);
    }
  });
}

try {
  console.log('build/');
  printTree(buildDir);
} catch (e) {
  console.log('  (无法显示目录结构)');
}

console.log('✨ 构建产物整理完成！');
console.log(`📂 产物位置: ${buildDir}\n`);
