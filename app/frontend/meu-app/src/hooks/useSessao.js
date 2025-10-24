import useFetch from "./useFetch";
import { SessoesService } from "../services/sessoes.service";

export function useSessoes(params) {
  return useFetch(() => SessoesService.list(params), [JSON.stringify(params)]);
}

export function useSessao(id) {
  return useFetch(() => SessoesService.get(id), [id]);
}
