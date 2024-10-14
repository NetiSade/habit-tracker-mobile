import { create } from "zustand";
import { HabitState } from "./habit/habitState";
import { AuthState } from "./auth/authState";

type AppState = AuthState & HabitState;

export const useAppStore = create<AppState>((set) => ({
  // Auth state
  isAuthenticated: false,
  userId: null,
  onLoginSuccess: (userId: string) => set({ isAuthenticated: true, userId }),
  onLogout: () =>
    set({
      isAuthenticated: false,
      userId: null,
      habits: [],
    }),
  // Habit state
  habits: [],
  setHabits: (habits) => set({ habits }),
}));
