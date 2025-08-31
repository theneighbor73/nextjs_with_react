"use client";
import { createContext } from "react";
import { UserDocument } from "@/models/userModel";

type AuthContextType = {
  user: UserDocument | null;
  loading: boolean;
  setAuth: (user: UserDocument | null) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setAuth: () => {},
  logout: () => {},
});
