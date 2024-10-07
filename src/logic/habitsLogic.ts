import { Habit } from "../types/habit";
import { useAppStore } from "../store";
import { habitsServiceImpl } from "../services/habits/habitsServiceImpl";
import { HabitsService } from "../services/habits/types";

const habitsService: HabitsService = habitsServiceImpl;
const LOG_PREFIX = "[habitsLogic] ";

export const habitsLogic = {
  fetchHabits: async (): Promise<Habit[]> => {
    const { setHabits } = useAppStore.getState();
    try {
      // API:
      const response = await habitsService.getHabits();

      console.log(
        "😎🔥 ~ file: habitsLogic.ts:17 ~ fetchHabits: ~ response:",
        JSON.stringify(response.habits)
      );

      // store:
      setHabits(response.habits);

      // TODO: Persist?

      return response.habits;
    } catch (error) {
      console.error(LOG_PREFIX + "Error fetching habits:", error);
      throw error;
    }
  },

  createHabit: async (name: string): Promise<Habit> => {
    try {
      // API:
      const response = await habitsService.createHabit(name);

      return response;
    } catch (error) {
      console.error(LOG_PREFIX + "Error creating hobby:", error);
      throw error;
    }
  },

  updateHabit: async (updatedHabit: Habit): Promise<Habit> => {
    try {
      // API:
      const response = await habitsService.updateHabit(updatedHabit);

      return response;
    } catch (error) {
      console.error(LOG_PREFIX + "Error updating habit:", error);
      throw error;
    }
  },

  toggleHabit: async (id: string): Promise<Habit> => {
    const { habits } = useAppStore.getState();

    try {
      const habit = habits.find((habit) => {
        return habit.id === id;
      });
      if (!habit) {
        throw new Error(`Habit with id ${id} not found`);
      }

      const updatedHabit = {
        ...habit,
        completed: !habit.completed,
      };

      // API:
      const res = await habitsService.updateHabit(updatedHabit);

      return res;
    } catch (error) {
      console.error(LOG_PREFIX + "Error toggling habit", error);
      throw error;
    }
  },

  deleteHabit: async (id: string): Promise<void> => {
    try {
      // API:
      await habitsService.deleteHabit(id);
    } catch (error) {
      console.error(LOG_PREFIX + "Error deleting habit", error);
      throw error;
    }
  },
};
