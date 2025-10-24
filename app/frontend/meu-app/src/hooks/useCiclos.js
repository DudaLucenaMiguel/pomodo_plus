import useFetch from "./useFetch";
import { withAbort } from "../services/http";
import { CiclosService } from "../services/ciclos.service";

export function useCiclos(params) {
  return useFetch(() => withAbort((signal) => CiclosService.list(params, signal)),
                  [JSON.stringify(params)]);
}

export function useCiclo(id) {
  return useFetch(() => withAbort((signal) => {
    if (!id) return Promise.resolve(null);
    return CiclosService.get(id, signal);
  }), [id]);
}
