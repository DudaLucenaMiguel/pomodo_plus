import { postJSON } from "./http";

const LOGIN_PATH = "/usuario/login";

export const AuthService = {
  login: (payload, signal) => postJSON(LOGIN_PATH, payload, signal),
};
