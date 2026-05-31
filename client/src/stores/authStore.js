import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      
      setAuth: (payload) => set((state) => ({
        user: payload.user !== undefined ? payload.user : state.user,
        accessToken: payload.accessToken !== undefined ? payload.accessToken : state.accessToken,
        isAuthenticated: payload.user ? true : (payload.accessToken ? state.isAuthenticated : false),
      })),
      
      clearAuth: () => set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
      })
    }),
    {
      name: 'devconnect-auth', // name of the item in the storage (must be unique)
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }), // don't persist accessToken
    }
  )
);
