import useFetch from "./useFetch";
import { withAbort } from "../services/http";
import { SessoesService } from "../services/api.service";

export function useSessoes(options = {}) {
  const { params = null, usuarioId = null } = options;

  return useFetch(
    () =>
      withAbort((signal) => {
        if (usuarioId !== null && usuarioId !== undefined) {
          return SessoesService.listByUsuario(usuarioId, signal);
        }
        return SessoesService.list(params, signal);
      }),
    [usuarioId ?? "", JSON.stringify(params ?? {})]
  );
}

export function useSessao(id) {
  return useFetch(() => withAbort((signal) => {
    if (!id) return Promise.resolve(null);
    return SessoesService.get(id, signal);
  }), [id]);
}
