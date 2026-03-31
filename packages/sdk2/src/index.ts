/**
 * @fileoverview SDK2 - API 请求封装库
 * 提供HTTP客户端和本地存储工具
 * @module @vue-vite-monorepo/sdk2
 */

/**
 * 请求配置接口
 * @interface RequestConfig
 */
export interface RequestConfig {
  /** 基础URL */
  baseURL?: string;
  /** 超时时间（毫秒） */
  timeout?: number;
  /** 默认请求头 */
  headers?: Record<string, string>;
}

/**
 * 响应数据接口
 * @interface Response
 * @template T
 */
export interface Response<T = any> {
  /** 响应数据 */
  data: T;
  /** HTTP状态码 */
  status: number;
  /** 状态文本 */
  statusText: string;
  /** 响应头 */
  headers: Record<string, string>;
}

/**
 * 请求错误接口
 * @interface RequestError
 * @extends Error
 */
export interface RequestError extends Error {
  /** 错误代码 */
  code?: string;
  /** HTTP状态码 */
  status?: number;
}

/**
 * HTTP客户端类
 * @class HttpClient
 * @classdesc 封装HTTP请求，支持GET、POST、PUT、DELETE方法
 * @example
 * const client = new HttpClient({
 *   baseURL: 'https://api.example.com',
 *   timeout: 5000
 * })
 *
 * const response = await client.get('/users')
 * console.log(response.data)
 */
export class HttpClient {
  private baseURL: string;
  private timeout: number;
  private defaultHeaders: Record<string, string>;

  /**
   * 创建HTTP客户端实例
   * @constructor
   * @param {RequestConfig} [config={}] - 配置选项
   * @param {string} [config.baseURL=''] - 基础URL
   * @param {number} [config.timeout=30000] - 超时时间（毫秒）
   * @param {Record<string, string>} [config.headers={}] - 默认请求头
   */
  constructor(config: RequestConfig = {}) {
    this.baseURL = config.baseURL || '';
    this.timeout = config.timeout || 30000;
    this.defaultHeaders = config.headers || {};
  }

  /**
   * 发送GET请求
   * @async
   * @template T
   * @param {string} url - 请求路径
   * @param {Record<string, any>} [params] - 查询参数
   * @returns {Promise<Response<T>>} 响应数据
   * @example
   * const response = await client.get('/users', { page: 1, limit: 10 })
   * console.log(response.data)
   */
  async get<T = any>(url: string, params?: Record<string, any>): Promise<Response<T>> {
    const fullUrl = this.buildUrl(url, params);
    return this.request<T>('GET', fullUrl);
  }

  /**
   * 发送POST请求
   * @async
   * @template T
   * @param {string} url - 请求路径
   * @param {any} [data] - 请求体数据
   * @returns {Promise<Response<T>>} 响应数据
   * @example
   * const response = await client.post('/users', { name: 'John', email: 'john@example.com' })
   * console.log(response.data)
   */
  async post<T = any>(url: string, data?: any): Promise<Response<T>> {
    const fullUrl = this.buildUrl(url);
    return this.request<T>('POST', fullUrl, data);
  }

  /**
   * 发送PUT请求
   * @async
   * @template T
   * @param {string} url - 请求路径
   * @param {any} [data] - 请求体数据
   * @returns {Promise<Response<T>>} 响应数据
   * @example
   * const response = await client.put('/users/1', { name: 'John Updated' })
   * console.log(response.data)
   */
  async put<T = any>(url: string, data?: any): Promise<Response<T>> {
    const fullUrl = this.buildUrl(url);
    return this.request<T>('PUT', fullUrl, data);
  }

  /**
   * 发送DELETE请求
   * @async
   * @template T
   * @param {string} url - 请求路径
   * @returns {Promise<Response<T>>} 响应数据
   * @example
   * const response = await client.delete('/users/1')
   * console.log(response.status) // 200
   */
  async delete<T = any>(url: string): Promise<Response<T>> {
    const fullUrl = this.buildUrl(url);
    return this.request<T>('DELETE', fullUrl);
  }

  /**
   * 构建完整URL
   */
  private buildUrl(url: string, params?: Record<string, any>): string {
    let fullUrl = this.baseURL + url;

    if (params) {
      const queryString = Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
      fullUrl += `?${queryString}`;
    }

    return fullUrl;
  }

  /**
   * 发送请求
   */
  private async request<T>(method: string, url: string, data?: any): Promise<Response<T>> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...this.defaultHeaders,
        },
        body: data ? JSON.stringify(data) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error: RequestError = new Error(`HTTP Error: ${response.status}`);
        error.status = response.status;
        throw error;
      }

      const responseData = await response.json() as T;

      return {
        data: responseData,
        status: response.status,
        statusText: response.statusText,
        headers: this.headersToObject(response.headers),
      };
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  /**
   * Headers 转对象
   */
  private headersToObject(headers: Headers): Record<string, string> {
    const obj: Record<string, string> = {};
    headers.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  }
}

/**
 * 创建HTTP客户端实例
 * @function createHttpClient
 * @param {RequestConfig} [config] - 配置选项
 * @returns {HttpClient} HTTP客户端实例
 * @example
 * const client = createHttpClient({
 *   baseURL: 'https://api.example.com',
 *   timeout: 5000
 * })
 */
export function createHttpClient(config?: RequestConfig): HttpClient {
  return new HttpClient(config);
}

/**
 * 本地存储工具
 * @namespace storage
 * @description 提供localStorage的封装方法
 * @example
 * storage.set('token', 'abc123')
 * const token = storage.get<string>('token')
 * console.log(token) // 'abc123'
 */
export const storage = {
  /**
   * 设置存储
   * @function set
   * @template T
   * @param {string} key - 存储键名
   * @param {T} value - 存储值
   * @example
   * storage.set('user', { name: 'John', age: 30 })
   */
  set<T>(key: string, value: T): void {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
    } catch (error) {
      console.error('Storage set error:', error);
    }
  },

  /**
   * 获取存储
   * @function get
   * @template T
   * @param {string} key - 存储键名
   * @returns {T|null} 存储值，不存在返回null
   * @example
   * const user = storage.get<{ name: string, age: number }>('user')
   * console.log(user) // { name: 'John', age: 30 }
   */
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Storage get error:', error);
      return null;
    }
  },

  /**
   * 移除存储
   * @function remove
   * @param {string} key - 存储键名
   * @example
   * storage.remove('token')
   */
  remove(key: string): void {
    localStorage.removeItem(key);
  },

  /**
   * 清空所有存储
   * @function clear
   * @example
   * storage.clear()
   */
  clear(): void {
    localStorage.clear();
  },
};

// 导出所有
export default {
  HttpClient,
  createHttpClient,
  storage,
};
