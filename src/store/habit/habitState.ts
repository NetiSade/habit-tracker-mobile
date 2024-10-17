import { Habit } from "@/src/types/habit";

export interface HabitState {
  habits: Habit[];
  setHabits: (habits: Habit[]) => void;
  updateHabit: (habit: Habit) => void;
}
