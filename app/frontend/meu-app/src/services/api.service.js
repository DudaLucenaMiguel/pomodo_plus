import { makeCrudService } from "./crudFactory";
import { postJSON } from "./http";

export const CiclosService = makeCrudService("/ciclo");

export const AssuntosService = makeCrudService("/assunto");

export const SessoesService = makeCrudService("/sessao");

export const TemasService = makeCrudService("/tema");

export const UsuariosService = makeCrudService("/usuario");

export const AuthService = {
  login: (payload, signal) => postJSON("/login", payload, signal),
  register: (payload, signal) => postJSON("/cadastro", payload, signal),
};
