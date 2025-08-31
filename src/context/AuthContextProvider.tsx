"use client";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { UserDocument } from "@/models/userModel";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setAuth] = useState<UserDocument | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log("Fetched user:", res.data.data);
      setAuth(res.data.data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setAuth(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const logout = async () => {
    try {
      await axios.post("/api/users/logout");
    } finally {
      setAuth(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
