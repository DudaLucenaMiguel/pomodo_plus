import axios from "axios";

const BASE_URL = import.meta?.env?.VITE_API_URL ?? "http://127.0.0.1:5000";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status ?? 0;
    const data = err?.response?.data;
    const message =
      data?.message ||
      data?.detail ||
      data?.erro ||
      err?.message ||
      "Erro de rede";
    return Promise.reject({ status, message, raw: err });
  }
);
