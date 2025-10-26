import { makeCrudService } from "./crudFactory";
import { getJSON } from "./http";

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
