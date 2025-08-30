"use client";
import { createContext } from "react";

type AuthContextType = {
  user: string | null; // username only
  loading: boolean;
  setAuth: (user: string | null) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setAuth: () => {},
  logout: () => {},
});
