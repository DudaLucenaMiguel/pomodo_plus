import useFetch from "./useFetch";
import { withAbort } from "../services/http";
import { TemasService } from "../services/api.service";

export function useTemas(params) {
  return useFetch(() => withAbort((signal) => TemasService.list(params, signal)),
                  [JSON.stringify(params)]);
}

export function useTema(id) {
  return useFetch(() => withAbort((signal) => {
    if (!id) return Promise.resolve(null);
    return TemasService.get(id, signal);
  }), [id]);
}
