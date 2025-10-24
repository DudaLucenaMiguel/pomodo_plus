import useFetch from "./useFetch";
import { TemasService } from "../services/temas.service";

export function useTemas(params) {
  return useFetch(() => TemasService.list(params), [JSON.stringify(params)]);
}

export function useTema(id) {
  return useFetch(() => TemasService.get(id), [id]);
}
