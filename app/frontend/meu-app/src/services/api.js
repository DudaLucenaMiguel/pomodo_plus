import axios from "axios";

const BASE_URL = import.meta?.env?.VITE_API_URL ?? "http://127.0.0.1:5000";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("[API ERROR]", err?.response?.status, err?.message);
    return Promise.reject(err);
  }
);

export default api;
