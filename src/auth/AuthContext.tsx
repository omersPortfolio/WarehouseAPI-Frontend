import { createContext, useContext, useState, useMemo, type ReactNode } from 'react';
import { TOKEN_KEY } from '../api/client';

export interface AuthUser {
    username: string;
    role: string;
}

interface AuthContextValue {
    token: string | null;
    user: AuthUser | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function decodeJwt(token: string): AuthUser | null {
    try {
        const payloadSegment = token.split('.')[1];
        const base64 = payloadSegment.replace(/-/g, '+').replace(/_/g, '/');
        const json = atob(base64);
        const claims = JSON.parse(json);
        const username = claims.unique_name ?? claims.name ?? null;
        const role = claims.role ?? null;
        if (!username || !role) return null;
        return { username, role };
    } catch {
        return null;
    }
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(
        () => localStorage.getItem(TOKEN_KEY)
    );

    const [user, setUser] = useState<AuthUser | null>(() => {
        const stored = localStorage.getItem(TOKEN_KEY);
        return stored ? decodeJwt(stored) : null;
    });

    function login(newToken: string) {
        localStorage.setItem(TOKEN_KEY, newToken);
        setToken(newToken);
        setUser(decodeJwt(newToken));
    }

    function logout() {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
    }

    const value = useMemo(
        () => ({ token, user, login, logout }),
        [token, user]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
    return ctx;
}