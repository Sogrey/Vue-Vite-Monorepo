#!/usr/bin/env node

/**
 * 构建并整理产物到 build 目录
 * 用于版本分发
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, cpSync, rmSync } from 'fs';
import { resolve } from 'path';

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
try {
  const treeOutput = execSync('tree build -L 2', { encoding: 'utf-8', cwd: rootDir });
  console.log(treeOutput);
} catch {
  // Windows 系统可能没有 tree 命令，使用 dir 替代
  try {
    const dirOutput = execSync('dir build /s /b', { encoding: 'utf-8', cwd: rootDir });
    console.log(dirOutput);
  } catch {
    console.log('  (无法显示目录结构)');
  }
}

console.log('✨ 构建产物整理完成！');
console.log(`📂 产物位置: ${buildDir}\n`);
