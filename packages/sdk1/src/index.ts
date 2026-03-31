/**
 * @fileoverview SDK1 - 工具函数库
 * 提供常用的工具函数，包括日期格式化、深拷贝、防抖、节流等
 * @module @vue-vite-monorepo/sdk1
 */

/**
 * 用户信息接口
 * @interface UserInfo
 */
export interface UserInfo {
  /** 用户ID */
  id: string;
  /** 用户名 */
  name: string;
  /** 用户邮箱 */
  email: string;
}

/**
 * 格式化日期
 * @function formatDate
 * @param {Date|string} date - 日期对象或日期字符串
 * @param {string} [format='YYYY-MM-DD'] - 格式化模板，支持 YYYY、MM、DD、HH、mm、ss
 * @returns {string} 格式化后的日期字符串
 * @example
 * formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
 * // 返回: '2026-03-31 12:00:00'
 *
 * formatDate('2026-03-31', 'YYYY年MM月DD日')
 * // 返回: '2026年03月31日'
 */
export function formatDate(date: Date | string, format: string = 'YYYY-MM-DD'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

/**
 * 深拷贝对象
 * @function deepClone
 * @template T
 * @param {T} obj - 要拷贝的对象
 * @returns {T} 拷贝后的新对象
 * @example
 * const original = { name: 'test', nested: { value: 123 } }
 * const cloned = deepClone(original)
 * console.log(cloned) // { name: 'test', nested: { value: 123 } }
 * console.log(cloned !== original) // true
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as T;
  }

  const cloned = {} as T;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }

  return cloned;
}

/**
 * 防抖函数
 * @function debounce
 * @template T
 * @param {T} func - 要防抖的函数
 * @param {number} wait - 等待时间（毫秒）
 * @returns {Function} 防抖后的函数
 * @example
 * const handleSearch = debounce((query) => {
 *   console.log('搜索:', query)
 * }, 500)
 *
 * // 快速调用多次，只在最后一次调用后 500ms 执行
 * handleSearch('test1')
 * handleSearch('test2')
 * handleSearch('test3') // 只有这次会执行
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (this: any, ...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

/**
 * 节流函数
 * @function throttle
 * @template T
 * @param {T} func - 要节流的函数
 * @param {number} limit - 时间间隔（毫秒）
 * @returns {Function} 节流后的函数
 * @example
 * const handleScroll = throttle(() => {
 *   console.log('滚动事件触发')
 * }, 1000)
 *
 * // 在 1 秒内多次调用，只执行第一次
 * window.addEventListener('scroll', handleScroll)
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;

  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * 生成唯一ID
 * @function generateId
 * @returns {string} 唯一ID字符串
 * @example
 * const id1 = generateId()
 * console.log(id1) // '1743406923456-abc123def'
 *
 * const id2 = generateId()
 * console.log(id1 !== id2) // true
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * 判断是否为空值
 * @function isEmpty
 * @param {*} value - 要检查的值
 * @returns {boolean} 如果为空返回 true，否则返回 false
 * @example
 * isEmpty(null)        // true
 * isEmpty(undefined)   // true
 * isEmpty('')          // true
 * isEmpty('  ')        // true
 * isEmpty([])          // true
 * isEmpty({})          // true
 * isEmpty('hello')     // false
 * isEmpty([1, 2])      // false
 * isEmpty({ a: 1 })    // false
 */
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === 'string') {
    return value.trim().length === 0;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }

  return false;
}

// 导出所有工具函数
export default {
  formatDate,
  deepClone,
  debounce,
  throttle,
  generateId,
  isEmpty,
};
