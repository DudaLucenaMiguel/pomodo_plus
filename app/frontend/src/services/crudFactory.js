import { getJSON, postJSON, putJSON, del } from "./http";

export function makeCrudService(basePath) {
  return {
    list:   (params, signal)          => getJSON(basePath, params, signal),
    get:    (id, signal)              => getJSON(`${basePath}/${id}`, null, signal),
    create: (payload, signal)         => postJSON(basePath, payload, signal),
    update: (id, payload, signal)     => putJSON(`${basePath}/${id}`, payload, signal),
    remove: (id, signal)              => del(`${basePath}/${id}`, signal),
  };
}
