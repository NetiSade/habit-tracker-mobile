import { Habit } from "../types/habit";
import { mockHabitsService } from "../services/mockHabitsService";
import { useHabitsStore } from "../store/habitsStore";

export const habitsLogic = {
  getHobbies: async (): Promise<Habit[]> => {
    const { setHabits } = useHabitsStore.getState();
    try {
      // API:
      const response = await mockHabitsService.getHabits();

      // store:
      setHabits(response.habits);

      // TODO: Persist?

      return response.habits;
    } catch (error) {
      console.error("Error fetching hobbies:", error);
      throw error;
    }
  },

  createHabit: async (name: string): Promise<void> => {
    const { addHabit } = useHabitsStore.getState();
    try {
      // API:
      const response = await mockHabitsService.createHabit(name);

      // store:
      addHabit(response);

      // TODO: Persist?
    } catch (error) {
      console.error("Error creating hobby:", error);
      throw error;
    }
  },

  updateHabit: async (updatedHabit: Habit): Promise<Habit> => {
    const { updateHabit } = useHabitsStore.getState();
    try {
      // API:
      const response = await mockHabitsService.updateHabit(updatedHabit);

      // store:
      updateHabit(response);

      // TODO: Persist?
      return response;
    } catch (error) {
      console.error("Error updating habit:", error);
      throw error;
    }
  },

  toggleHabit: async (id: string): Promise<void> => {
    const { updateHabit, habits } = useHabitsStore.getState();

    try {
      const habit = habits.find((habit) => habit.id === id);

      if (!habit) {
        throw new Error(`Habit with id ${id} not found`);
      }

      const updatedHabit = {
        ...habit,
        completed: !habit.completed,
      };

      // API:
      await mockHabitsService.updateHabit(updatedHabit);

      // store:
      updateHabit(updatedHabit);

      // TODO: Persist?
    } catch (error) {
      console.error("Error toggling habit", error);
      throw error;
    }
  },

  deleteHabit: async (id: string): Promise<void> => {
    try {
      await mockHabitsService.deleteHabit(id);

      // TODO: Persist?
    } catch (error) {
      console.error("Error deleting habit", error);
      throw error;
    }
  },
};
