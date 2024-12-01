import { create } from "zustand";
import { persist } from "zustand/middleware";

// Updated User interface to include token
interface User {
  username: string;
  role: string;
  token?: string;
  email?: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      // Updated setUser method
      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),

      // Logout method to clear authentication
      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage", // name of the item in local storage
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
