// utils/request.js
import axios from "axios";

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  timeout: 15000,
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 1. 携带 token
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 2. 防止 GET 缓存
    if (config.method === "get") {
      config.params = { ...config.params, _t: Date.now() };
    }

    // 3. 添加其他公共头部（按需）
    // config.headers['X-Tenant-Id'] = localStorage.getItem('tenantId')

    return config;
  },
  (error) => {
    console.error("请求错误:", error);
    return Promise.reject(error);
  },
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    const res = response.data;

    // 文件下载直接返回原始响应
    if (response.config.responseType === "blob") {
      return response;
    }

    // 成功（根据后端约定调整）
    if (res.code === 200 || res.code === 0) {
      return res.data;
    }

    // Token 过期
    if (res.code === 401) {
      alert("登录已过期，请重新登录");
      localStorage.removeItem("token");
      window.location.href = "/login";
      return Promise.reject(new Error("未授权"));
    }

    // 业务错误
    const message = res.message || "请求失败";
    alert(message);
    return Promise.reject(new Error(message));
  },
  (error) => {
    // 网络错误
    if (!error.response) {
      alert("网络连接失败，请检查网络");
      return Promise.reject(error);
    }

    // HTTP 状态码错误
    const status = error.response.status;
    const messages = {
      400: "请求参数错误",
      401: "未授权，请重新登录",
      403: "权限不足",
      404: "请求地址不存在",
      500: "服务器内部错误",
      502: "网关错误",
      503: "服务暂时不可用",
    };

    const message = messages[status] || `请求失败 (${status})`;

    if (status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    alert(message);
    return Promise.reject(error);
  },
);

export default request;
