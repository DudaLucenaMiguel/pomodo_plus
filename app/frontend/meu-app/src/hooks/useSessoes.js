import useFetch from "./useFetch";
import { withAbort } from "../services/http";
import { SessoesService } from "../services/api.service";

export function useSessoes(options, maybeUsuarioId) {
  let params = null;
  let usuarioId = null;

  if (
    arguments.length <= 1 &&
    options &&
    typeof options === "object" &&
    !Array.isArray(options) &&
    ("params" in options || "usuarioId" in options)
  ) {
    params = options.params ?? null;
    usuarioId = options.usuarioId ?? null;
  } else {
    params = options ?? null;
    usuarioId = maybeUsuarioId ?? null;
  }

  return useFetch(
    () =>
      withAbort((signal) => {
        if (usuarioId !== null && usuarioId !== undefined) {
          return SessoesService.listByUsuario(usuarioId, params, signal);
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
