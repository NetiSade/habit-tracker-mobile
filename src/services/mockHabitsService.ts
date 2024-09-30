import { Habit } from "../types/habit";
import { GetHabitsResponse, HabitsService } from "./types";

const MOCK_HABITS: Habit[] = [
  {
    id: "1",
    name: "Reading",
    completed: false,
  },
  {
    id: "2",
    name: "Swimming",
    completed: false,
  },
  {
    id: "3",
    name: "Cycling",
    completed: false,
  },
  {
    id: "4",
    name: "Running",
    completed: false,
  },
];

export const mockHabitsService: HabitsService = {
  // mock data
  getHabits: async (): Promise<GetHabitsResponse> => {
    return {
      habits: MOCK_HABITS,
    };
  },

  createHabit: async (name: string): Promise<Habit> => {
    return { id: new Date().toISOString(), name, completed: false };
  },

  updateHabit: async (updatedHabit: Habit): Promise<Habit> => {
    return updatedHabit;
  },

  deleteHabit: async (id: string): Promise<void> => {
    return;
  },
};
