/**
 * SDK2 - API 请求封装库
 */

export interface RequestConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface Response<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

export interface RequestError extends Error {
  code?: string;
  status?: number;
}

/**
 * 创建请求实例
 */
export class HttpClient {
  private baseURL: string;
  private timeout: number;
  private defaultHeaders: Record<string, string>;

  constructor(config: RequestConfig = {}) {
    this.baseURL = config.baseURL || '';
    this.timeout = config.timeout || 30000;
    this.defaultHeaders = config.headers || {};
  }

  /**
   * GET 请求
   */
  async get<T = any>(url: string, params?: Record<string, any>): Promise<Response<T>> {
    const fullUrl = this.buildUrl(url, params);
    return this.request<T>('GET', fullUrl);
  }

  /**
   * POST 请求
   */
  async post<T = any>(url: string, data?: any): Promise<Response<T>> {
    const fullUrl = this.buildUrl(url);
    return this.request<T>('POST', fullUrl, data);
  }

  /**
   * PUT 请求
   */
  async put<T = any>(url: string, data?: any): Promise<Response<T>> {
    const fullUrl = this.buildUrl(url);
    return this.request<T>('PUT', fullUrl, data);
  }

  /**
   * DELETE 请求
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
 * 创建默认 HTTP 客户端
 */
export function createHttpClient(config?: RequestConfig): HttpClient {
  return new HttpClient(config);
}

/**
 * 本地存储工具
 */
export const storage = {
  /**
   * 设置存储
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
   */
  remove(key: string): void {
    localStorage.removeItem(key);
  },

  /**
   * 清空存储
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
