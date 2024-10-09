import { useAppStore } from "@/src/store";
import { Habit } from "../../types/habit";
import { apiClient } from "../api_core/apiClient";
import { GetHabitsResponse, HabitsService } from "./types";

const LOG_PREFIX = "[habitsServiceImpl] ";

export const habitsServiceImpl: HabitsService = {
  getHabits: async (): Promise<GetHabitsResponse> => {
    try {
      const { userId } = useAppStore.getState();
      const response = await apiClient.get(`/habits/${userId}`);
      return response.data;
    } catch (error) {
      console.error(LOG_PREFIX + "Error fetching habits:", error);
      throw error;
    }
  },

  createHabit: async (name: string): Promise<Habit> => {
    const { userId } = useAppStore.getState();

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

  updateHabit: async (updatedHabit: Habit): Promise<Habit> => {
    try {
      const { userId } = useAppStore.getState();

      const response = await apiClient.put(
        `/habits/${userId}/${updatedHabit.id}`,
        updatedHabit
      );

      return response.data;
    } catch (error) {
      console.error(LOG_PREFIX + "Error updating habit:", error);
      throw error;
    }
  },

  deleteHabit: async (id: string): Promise<Habit> => {
    try {
      const response = await apiClient.delete(`/habits/${id}`);

      return response.data;
    } catch (error) {
      console.error(LOG_PREFIX + "Error deleting habit:", error);
      throw error;
    }
  },
};
