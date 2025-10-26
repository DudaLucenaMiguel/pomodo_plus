import useFetch from "./useFetch";
import { withAbort } from "../services/http";
import { CiclosService } from "../services/api.service";

export function useCiclos(options = {}) {
  const { params = null, usuarioId = null } = options;

  return useFetch(
    () =>
      withAbort((signal) => {
        if (usuarioId !== null && usuarioId !== undefined) {
          return CiclosService.listByUsuario(usuarioId, signal);
        }
        return CiclosService.list(params, signal);
      }),
    [usuarioId ?? "", JSON.stringify(params ?? {})]
  );
}

export function useCiclo(id) {
  return useFetch(() => withAbort((signal) => {
    if (!id) return Promise.resolve(null);
    return CiclosService.get(id, signal);
  }), [id]);
}
