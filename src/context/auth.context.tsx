import React, { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  setAccessToken: () => {},
});

interface AuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    // Überprüfe den localStorage beim Initialisieren des Zustands
    return localStorage.getItem("accessToken");
  });

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get("access_token");
      const expiresIn = params.get("expires_in");

      if (token) {
        setAccessToken(token);
        localStorage.setItem("accessToken", token);

        // Clear hash.
        window.location.hash = "";

        // Handle token expiration
        setTimeout(() => {
          setAccessToken(null);
          localStorage.removeItem("accessToken");
          alert("Session expired. Please log in again.");
        }, Number(expiresIn) * 1000);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthWrapper, AuthContext };
