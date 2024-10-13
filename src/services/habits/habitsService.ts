import { apiClient } from "../api_core/apiClient";
import { GetHabitsResponse } from "./types";

const LOG_PREFIX = "[habitsServiceImpl] ";

export const habitsService = {
  getDailyHabits: async (
    userId: string,
    date: string
  ): Promise<GetHabitsResponse> => {
    try {
      const response = await apiClient.get(`/habits/${userId}`, {
        params: {
          date,
        },
      });

      console.log(
        "😎🔥 ~ file: habitsService.ts:15 ~ response:",
        response.data
      );

      return response.data;
    } catch (error) {
      console.error(LOG_PREFIX + "Error fetching habits:", error);
      throw error;
    }
  },

  createHabit: async (userId: string, name: string): Promise<string> => {
    try {
      const response = await apiClient.post("/habits", {
        name,
        userId,
      });
      return response.data;
    } catch (error) {
      console.error(LOG_PREFIX + "Error creating habit:", error);
      throw error;
    }
  },

  toggleHabit: async (
    userId: string,
    habitId: string,
    isDone: boolean,
    date: string
  ): Promise<string> => {
    try {
      const response = await apiClient.post(
        `/habits/${userId}/${habitId}/toggle`,
        {
          isDone,
          date,
        }
      );

      console.log(
        "😎🔥 ~ file: habitsService.ts:53 ~ response:",
        response.data
      );

      return response.data;
    } catch (error) {
      console.error(LOG_PREFIX + "Error updating habit:", error);
      throw error;
    }
  },

  deleteHabit: async (id: string): Promise<string> => {
    try {
      const response = await apiClient.delete(`/habits/${id}`);

      return response.data;
    } catch (error) {
      console.error(LOG_PREFIX + "Error deleting habit:", error);
      throw error;
    }
  },
};
