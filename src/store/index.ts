import { create } from "zustand";
import { HabitState } from "./habit/habitState";
import { AuthState } from "./auth/authState";

type AppState = AuthState & HabitState;

export const useAppStore = create<AppState>((set) => ({
  // Auth state
  isEmailVerified: false,
  isAuthenticated: false,
  userId: null,
  onRegisterSuccess: (userId: string) =>
    set({ userId, isAuthenticated: false }),
  onLoginSuccess: (userId: string) => set({ isAuthenticated: true, userId }),
  onLoginFailure: () => set({ isAuthenticated: false, habits: [] }),
  onLogout: () =>
    set({
      isAuthenticated: false,
      userId: null,
      habits: [],
    }),
  setUserId: (userId: string) => set({ userId }),
  // Habit state
  habits: [],
  setHabits: (habits) => set({ habits }),
  updateHabit: (habit) =>
    set((state) => ({
      habits: state.habits.map((h) => (h.id === habit.id ? habit : h)),
    })),
}));
