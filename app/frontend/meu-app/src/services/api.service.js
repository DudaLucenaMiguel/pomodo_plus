import { makeCrudService } from "./crudFactory";
import { getJSON, postJSON } from "./http";

const CICLOS_BASE_PATH = "/ciclo";
const SESSOES_BASE_PATH = "/sessao";

export const CiclosService = {
  ...makeCrudService(CICLOS_BASE_PATH),
  listByUsuario: (usuarioId, signal) =>
    getJSON(`${CICLOS_BASE_PATH}/usuario/${usuarioId}`, null, signal),
};

export const AssuntosService = makeCrudService("/assunto");

export const SessoesService = {
  ...makeCrudService(SESSOES_BASE_PATH),
  listByUsuario: (usuarioId, signal) =>
    getJSON(`${SESSOES_BASE_PATH}/usuario/${usuarioId}`, null, signal),
};

export const TemasService = makeCrudService("/tema");
export const UsuariosService = makeCrudService("/usuario");

export const AuthService = {
  login: (payload, signal) => postJSON("/login", payload, signal),
  register: (payload, signal) => postJSON("/cadastro", payload, signal),
};
