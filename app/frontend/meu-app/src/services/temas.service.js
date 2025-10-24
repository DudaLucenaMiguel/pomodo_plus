import { getJSON, postJSON, putJSON, del } from "./http";

const BASE = "/tema";

export const TemasService = {
  list:  (params)     => getJSON(BASE, params),
  get:   (id)         => getJSON(`${BASE}/${id}`),       
  create:(payload)    => postJSON(BASE, payload),        
  update:(id, payload)=> putJSON(`${BASE}/${id}`, payload), 
  remove:(id)         => del(`${BASE}/${id}`),           
};
