import { api } from "./api";

export function getJSON(path, params, signal) {
  return api.get(path, { params, signal }).then((r) => r.data);
}
export function postJSON(path, body, signal) {
  return api.post(path, body, { signal }).then((r) => r.data);
}
export function putJSON(path, body, signal) {
  return api.put(path, body, { signal }).then((r) => r.data);
}
export function del(path, signal) {
  return api.delete(path, { signal }).then((r) => r.data);
}

export function withAbort(fn) {
  const controller = new AbortController();
  const promise = fn(controller.signal);
  return { promise, abort: () => controller.abort() };
}
