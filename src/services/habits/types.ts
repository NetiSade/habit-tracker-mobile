import { Habit } from "../../types/habit";

export type GetHabitsResponse = {
  habits: Habit[];
};

export interface HabitsService {
  getHabits: () => Promise<GetHabitsResponse>;
  createHabit: (name: string) => Promise<Habit>;
  updateHabit: (updatedHabit: Habit) => Promise<Habit>;
  deleteHabit: (id: string) => Promise<Habit>;
}
