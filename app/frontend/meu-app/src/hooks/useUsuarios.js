import useFetch from "./useFetch";
import { withAbort } from "../services/http";
import { UsuariosService } from "../services/usuarios.service";

export function useUsuarios(params) {
  return useFetch(() => withAbort((signal) => UsuariosService.list(params, signal)),
                  [JSON.stringify(params)]);
}

export function useUsuario(id) {
  return useFetch(() => withAbort((signal) => {
    if (!id) return Promise.resolve(null);
    return UsuariosService.get(id, signal);
  }), [id]);
}
