import useFetch from "./useFetch";
import { withAbort } from "../services/http";
import { SessoesService } from "../services/api.service";

export function useSessoes(params) {
  return useFetch(() => withAbort((signal) => SessoesService.list(params, signal)),
                  [JSON.stringify(params)]);
}

export function useSessao(id) {
  return useFetch(() => withAbort((signal) => {
    if (!id) return Promise.resolve(null);
    return SessoesService.get(id, signal);
  }), [id]);
}
