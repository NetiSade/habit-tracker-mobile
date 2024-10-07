import { create } from "zustand";
import { HabitState } from "./habit/habitState";
import { AuthState } from "./auth/authState";

type AppState = AuthState & HabitState;

export const useAppStore = create<AppState>((set) => ({
  // Auth state
  token: null,
  userId: null,
  isAuthenticated: false,
  onLogin: (token, userId) => set({ token, userId, isAuthenticated: true }),
  onLogout: () =>
    set({
      token: null,
      userId: null,
      isAuthenticated: false,
      habits: [],
    }),
  // Habit state
  habits: [],
  setHabits: (habits) => set({ habits }),
}));
