import { useCallback } from "react";
import { AuthService } from "../services/api.service";
import { withAbort } from "../services/http";

export function useLogin() {
  return useCallback(
    (credentials) => withAbort((signal) => AuthService.login(credentials, signal)),
    []
  );
}

export function useCadastro() {
  return useCallback(
    (payload) => withAbort((signal) => AuthService.register(payload, signal)),
    []
  );
}
