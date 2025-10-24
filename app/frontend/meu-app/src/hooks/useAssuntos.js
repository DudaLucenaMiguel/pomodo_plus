import useFetch from "./useFetch";
import { withAbort } from "../services/http";
import { AssuntosService } from "../services/assuntos.service";

export function useAssuntos(params) {
  return useFetch(() => withAbort((signal) => AssuntosService.list(params, signal)),
                  [JSON.stringify(params)]);
}

export function useAssunto(id) {
  return useFetch(() => withAbort((signal) => {
    if (!id) return Promise.resolve(null);
    return AssuntosService.get(id, signal);
  }), [id]);
}
