import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { DragEndParams } from "react-native-draggable-flatlist";

import { useAppStore } from "@/src/store";
import { Habit } from "@/src/types/habit";
import { habitsLogic } from "@/src/logic/habitsLogic";
import { authLogic } from "@/src/logic/authLogic";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

const QUERY_KEY = "habits";

export const useDailyHabits = () => {
  // States
  const { habits, setHabits, updateHabit } = useAppStore();
  const queryClient = useQueryClient();

  const [isEditMode, setIsEditMode] = useState(false);

  const [modalState, setModalState] = useState<{
    isVisible: boolean;
    itemToEdit: Habit | null;
  }>({
    isVisible: false,
    itemToEdit: null,
  });

  const router = useRouter();

  // Queries
  const apiState = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: habitsLogic.fetchHabits,
  });

  // Handlers
  const toggleHabit = async (habit: Habit) => {
    try {
      // optimistic update
      const updatedHabit = { ...habit, isCompleted: !habit.isCompleted };
      updateHabit(updatedHabit);
      await habitsLogic.toggleHabit(habit.id, !habit.isCompleted);
    } catch (error) {
      console.error("Error toggling habit:", error);
    }
  };

  const handleAddHabit = async (habitName: string) => {
    try {
      await habitsLogic.createHabit(habitName);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    } catch (error) {
      console.error("Error creating habit:", error);
    }
  };

  const handleEditHabitSubmit = async (
    habitId: string,
    newHabitName: string
  ) => {
    try {
      await habitsLogic.updateHabits([
        {
          id: habitId,
          name: newHabitName,
        },
      ]);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    } catch (error) {
      console.error("Error updating habit:", error);
    }
  };

  const handleModalClose = () => {
    setModalState({
      isVisible: false,
      itemToEdit: null,
    });
  };

  const onRefresh = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleLogoutPress = async () => {
    try {
      Alert.alert("Logout", "Are you sure you want to logout?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await authLogic.logout();
            router.replace("/login");
          },
        },
      ]);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleDeleteHabit = async (habitId: string) => {
    try {
      await habitsLogic.deleteHabit(habitId);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  };

  const handleDeleteHabitAlert = (habitId: string, habitName: string) => {
    Alert.alert(
      "Delete Habit",
      `Are you sure you want to delete "${habitName}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => handleDeleteHabit(habitId),
        },
      ]
    );
  };

  const handleEditHabitPress = (habit: Habit) => {
    setModalState({
      isVisible: true,
      itemToEdit: habit,
    });
  };

  const handleCreateHabitPress = () => {
    setModalState({
      isVisible: true,
      itemToEdit: null,
    });
  };

  const handleOnDragEnd = async ({ data }: DragEndParams<Habit>) => {
    const updatedHabits = data.map((habit, index) => ({
      ...habit,
      priority: index + 1,
    }));
    setHabits(updatedHabits);
    await habitsLogic.updateHabits(updatedHabits);
  };

  const completedHabitsCount = habits.filter(
    (habit) => habit.isCompleted
  ).length;

  return {
    apiState,
    habits,
    modalState,
    isEditMode,
    completedHabitsCount,
    onRefresh,
    toggleHabit,
    handleAddHabit,
    handleEditHabitSubmit,
    handleEditHabitPress,
    handleCreateHabitPress,
    handleDeleteHabit: handleDeleteHabitAlert,
    handleOnDragEnd,
    handleModalClose,
    handleLogoutPress,
    toggleEditMode,
  };
};
