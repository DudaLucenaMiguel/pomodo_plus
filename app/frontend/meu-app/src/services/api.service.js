import { makeCrudService } from "./crudFactory";

export const CiclosService = makeCrudService("/ciclo");

export const AssuntosService = makeCrudService("/assunto");

export const SessoesService = makeCrudService("/sessao");

export const TemasService = makeCrudService("/tema");

export const UsuariosService = makeCrudService("/usuario");