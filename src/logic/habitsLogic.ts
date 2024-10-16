import { Habit } from "../types/habit";
import { useAppStore } from "../store";
import { habitsService } from "../services/habits/habitsService";
import { getClientDate } from "../utils.ts/date";

const LOG_PREFIX = "[habitsLogic] ";

export const habitsLogic = {
  fetchHabits: async (): Promise<Habit[]> => {
    try {
      const { userId, setHabits } = useAppStore.getState();
      const clientDate = getClientDate();

      if (!userId) {
        throw new Error("User not found");
      }

      // API:
      const response = await habitsService.getDailyHabits(userId, clientDate);

      // store:
      setHabits(response.habits);

      return response.habits;
    } catch (error) {
      console.error(LOG_PREFIX + "Error fetching habits:", error);
      throw error;
    }
  },

  createHabit: async (name: string): Promise<string> => {
    try {
      const { userId } = useAppStore.getState();

      if (!userId) {
        throw new Error("User not found");
      }

      // API:
      const response = await habitsService.createHabit(userId, name);

      return response;
    } catch (error) {
      console.error(LOG_PREFIX + "Error creating hobby:", error);
      throw error;
    }
  },

  updateHabit: async (habitId: string, newName: string): Promise<string> => {
    try {
      const { userId } = useAppStore.getState();

      if (!userId) {
        throw new Error("User not found");
      }

      // API:
      const res = await habitsService.updateHabit(userId, habitId, newName);

      return res;
    } catch (error) {
      console.error(LOG_PREFIX + "Error updating habit", error);
      throw error;
    }
  },

  toggleHabit: async (id: string, isDone: boolean): Promise<string> => {
    try {
      const { userId } = useAppStore.getState();
      const clientDate = getClientDate();

      if (!userId) {
        throw new Error("User not found");
      }

      // API:
      const res = await habitsService.toggleHabit(
        userId,
        id,
        isDone,
        clientDate
      );

      return res;
    } catch (error) {
      console.error(LOG_PREFIX + "Error toggling habit", error);
      throw error;
    }
  },

  deleteHabit: async (id: string): Promise<string> => {
    try {
      // API:
      const res = await habitsService.deleteHabit(id);

      return res;
    } catch (error) {
      console.error(LOG_PREFIX + "Error deleting habit", error);
      throw error;
    }
  },
};
