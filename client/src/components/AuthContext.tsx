import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { IUser } from "../../../models/user";

const AuthContext = createContext<{
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  signOut: () => void;
} | null>(null);

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const config = {
          headers: { Authorization: `${token}` },
        };

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/token`,
          config
        );
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const signOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
