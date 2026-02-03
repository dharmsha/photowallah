'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  // Initialize auth state
  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === 'undefined') return;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      setInitialized(true);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    if (!initialized) {
      throw new Error('Auth not initialized');
    }
    await signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (email: string, password: string) => {
    if (!initialized) {
      throw new Error('Auth not initialized');
    }
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    if (!initialized) {
      throw new Error('Auth not initialized');
    }
    await signOut(auth);
  };

  const resetPassword = async (email: string) => {
    if (!initialized) {
      throw new Error('Auth not initialized');
    }
    await sendPasswordResetEmail(auth, email);
  };

  const value: AuthContextType = {
    user,
    loading,
    initialized,
    login,
    register,
    logout,
    resetPassword,
  };

  // Render children immediately, components will handle loading state
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Fallback context for SSR
const fallbackAuthContext: AuthContextType = {
  user: null,
  loading: true,
  initialized: false,
  login: async () => {
    console.warn('Auth not initialized');
  },
  register: async () => {
    console.warn('Auth not initialized');
  },
  logout: async () => {
    console.warn('Auth not initialized');
  },
  resetPassword: async () => {
    console.warn('Auth not initialized');
  },
};

export function useAuth() {
  const context = useContext(AuthContext);
  
  // For SSR, return fallback context
  if (context === undefined) {
    return fallbackAuthContext;
  }
  
  return context;
}