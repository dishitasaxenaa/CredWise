import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    localStorage.getItem("bankToken")
  );

  const login = (token) => {
    localStorage.setItem("bankToken", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("bankToken");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
