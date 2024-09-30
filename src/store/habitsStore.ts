import { create } from "zustand";
import { Habit } from "../types/habit";

interface HabitState {
  habits: Habit[];
  setHabits: (habits: Habit[]) => void;
  addHabit: (habit: Habit) => void;
  updateHabit: (habit: Habit) => void;
}

export const useHabitsStore = create<HabitState>((set) => ({
  habits: [],
  loading: false,
  error: null,
  setHabits: (habits) => set({ habits }),
  addHabit: (habit) => set((state) => ({ habits: [...state.habits, habit] })),
  updateHabit: (updatedHabit) =>
    set((state) => ({
      habits: state.habits.map((habit) =>
        habit.id === updatedHabit.id ? updatedHabit : habit
      ),
    })),
}));
