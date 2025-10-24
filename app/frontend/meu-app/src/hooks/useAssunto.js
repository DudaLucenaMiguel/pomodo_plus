import useFetch from "./useFetch";
import { AssuntosService } from "../services/assuntos.service";

export function useAssuntos(params) {
  return useFetch(() => AssuntosService.list(params), [JSON.stringify(params)]);
}

export function useAssunto(id) {
  return useFetch(() => AssuntosService.get(id), [id]);
}

