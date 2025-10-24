import { getJSON, postJSON, putJSON, del } from "./http";

// Ajuste os caminhos abaixo para os endpoints do seu backend Flask
const BASE = "/assunto";

export const AssuntosService = {
  list:  (params)     => getJSON(BASE, params),
  get:   (id)         => getJSON(`${BASE}/${id}`),       
  create:(payload)    => postJSON(BASE, payload),        
  update:(id, payload)=> putJSON(`${BASE}/${id}`, payload), 
  remove:(id)         => del(`${BASE}/${id}`),           
};