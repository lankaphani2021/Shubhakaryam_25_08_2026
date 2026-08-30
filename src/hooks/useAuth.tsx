import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import auth from "@/lib/shared/app-auth.js";

interface AuthUser {
  userUuid: string;
  email: string;
  firstName?: string;
  lastName?: string;
  groups?: { key: string }[];
}

interface AuthCtx {
  user: AuthUser | null;
  loading: boolean;
  isAdmin: boolean;
  refresh: () => Promise<void>;
  signOut: () => Promise<void>;
}

const Ctx = createContext<AuthCtx>({
  user: null,
  loading: true,
  isAdmin: false,
  refresh: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    const u = await auth.getUser(true);
    setUser(u);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  const signOut = async () => {
    await auth.signOut();
    setUser(null);
  };

  const isAdmin = !!user?.groups?.some((g) => g.key === "pooja-admins");

  return (
    <Ctx.Provider value={{ user, loading, isAdmin, refresh, signOut }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx);
