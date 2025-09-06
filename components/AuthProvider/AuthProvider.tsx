"use client";
import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect, useState } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(true);
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );
  useEffect(() => {
    const fetchUser = async () => {
      const isAuthenticated = await checkSession();
      if (isAuthenticated) {
        const user = await getMe();
        setLoading(false);
        if (user) {
          setUser(user);
          setLoading(false);
        }
      } else {
        clearIsAuthenticated();
        setLoading(false);
      }
    };
    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return children;
}
