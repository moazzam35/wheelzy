import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export function useAuth() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (email, password) => {
    setLoading(true);
    setError("");
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError(res.error || "Invalid credentials");
        return { success: false, error: res.error };
      }

      return { success: true };
    } catch (err) {
      setError("An unexpected error occurred during login");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async ({ name, email, password }) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed");
        return { success: false, error: data.error };
      }

      return { success: true };
    } catch (err) {
      setError("An unexpected error occurred during registration");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut({ redirect: true, callbackUrl: "/" });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    user: session?.user || null,
    isAuthenticated: !!session,
    isAdmin: session?.user?.role === "ADMIN",
    status,
    loading,
    error,
    login,
    register,
    logout,
  };
}
