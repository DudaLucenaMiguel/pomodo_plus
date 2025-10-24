import useFetch from "./useFetch";
import { UsuariosService } from "../services/usuarios.service";

export function useUsuarios(params) {
  return useFetch(() => UsuariosService.list(params), [JSON.stringify(params)]);
}

export function useUsuario(id) {
  return useFetch(() => UsuariosService.get(id), [id]);
}
