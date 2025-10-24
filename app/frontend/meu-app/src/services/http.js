import api from "./api";

export async function getJSON(path, params) {
  const { data } = await api.get(path, { params });
  return data;
}

export async function postJSON(path, body) {
  const { data } = await api.post(path, body);
  return data;
}

export async function putJSON(path, body) {
  const { data } = await api.put(path, body);
  return data;
}

export async function del(path) {
  const { data } = await api.delete(path);
  return data;
}
