import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Session } from "@/features/auth/types";

interface SessionStates {
  isLoading: boolean;
  isAuthenticated: boolean;
  session: Session | null;
  isOnboarded: boolean;
}

interface SessionActions {
  setSession: (session: Session) => void;
  clearSession: () => void;
  getSession: () => Promise<void>;
  setIsOnBoarded: () => void;
}

const SESSION_KEY = "tanuri-session";

export const useSessionStore = create<SessionStates & SessionActions>()(
  persist(
    (set) => ({
      isLoading: true,
      isAuthenticated: false,
      session: null,
      isOnboarded: false,

      setSession: (session) => {
        set({
          session,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      clearSession: () => {
        set({
          session: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      getSession: async () => {
        set({ isLoading: true });
        try {
          const stored = await SecureStore.getItemAsync(SESSION_KEY);
          if (!stored) {
            set({ isLoading: false, session: null, isAuthenticated: false });
            return;
          }

          const session: Session = JSON.parse(stored);
          set({ session, isAuthenticated: true, isLoading: false });
        } catch (error) {
          console.error("Failed to load session:", error);
          set({ isLoading: false, session: null, isAuthenticated: false });
        }
      },

      setIsOnBoarded: () => {
        set({ isOnboarded: true });
      },
    }),
    {
      name: SESSION_KEY,
      storage: createJSONStorage(() => ({
        getItem: async (name) => {
          const value = await SecureStore.getItemAsync(name);
          return value ?? null;
        },
        setItem: async (name, value) => {
          await SecureStore.setItemAsync(name, value);
        },
        removeItem: async (name) => {
          await SecureStore.deleteItemAsync(name);
        },
      })),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isLoading = false;
          state.isAuthenticated = !!state.session;
        }
      },
    },
  ),
);

export const getSession = () => useSessionStore.getState();
