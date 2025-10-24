import useFetch from "./useFetch";
import { ciclosService } from "../services/ciclos.service";

export function useCiclos(params) {
  return useFetch(() => ciclosService.list(params), [JSON.stringify(params)]);
}

export function useCiclo(id) {
  return useFetch(() => ciclosService.get(id), [id]);
}

