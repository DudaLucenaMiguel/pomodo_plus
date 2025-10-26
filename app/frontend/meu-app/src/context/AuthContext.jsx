import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

const STORAGE_KEY = "auth_user";

const AuthContext = createContext(null);

function loadStoredUser() {
  if (typeof window === "undefined") return null;

  const storages = [];
  try {
    storages.push(window.sessionStorage);
  } catch (err) {
    console.warn("Sessão indisponível para autenticação:", err);
  }
  try {
    storages.push(window.localStorage);
  } catch (err) {
    console.warn("Armazenamento local indisponível para autenticação:", err);
  }

  for (const storage of storages) {
    if (!storage) continue;
    try {
      const raw = storage.getItem(STORAGE_KEY);
      if (!raw) continue;
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object" && parsed.id) {
        return parsed;
      }
    } catch (err) {
      console.warn("Falha ao carregar usuário autenticado:", err);
    }
  }
  return null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadStoredUser());

  const login = useCallback((userData, options = {}) => {
    setUser(userData);
    if (typeof window === "undefined") return;

    const { remember = false } = options;
    const serialized = JSON.stringify(userData);

    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem(STORAGE_KEY);
      if (remember) {
        window.localStorage.setItem(STORAGE_KEY, serialized);
      } else {
        window.sessionStorage.setItem(STORAGE_KEY, serialized);
      }
    } catch (err) {
      console.warn("Falha ao armazenar usuário autenticado:", err);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    if (typeof window === "undefined") return;

    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.warn("Falha ao remover usuário autenticado:", err);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      userId: user?.id ?? null,
      isAuthenticated: Boolean(user?.id),
      login,
      logout,
    }),
    [user, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser utilizado dentro de um AuthProvider");
  }
  return context;
}
