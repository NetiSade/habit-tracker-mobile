import React, { useLayoutEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { useAppStore } from "@/src/store";
import { habitsLogic } from "@/src/logic/habitsLogic";
import { Habit } from "@/src/types/habit";
import { AddHabitModal } from "@/src/components/modals/AddHabitModal";
import DailyHabitItem from "./DailyHabitItem";
import { formatDate } from "./utils";
import OptionsMenu from "./components/OptionsMenu";
import { useNavigation } from "expo-router";
import { authLogic } from "@/src/logic/authLogic";
import { FAB } from "react-native-paper";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";

const QUERY_KEY = "habits";

const DailyHabitsScreen = () => {
  // States
  const { habits } = useAppStore();
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  const clientDate = new Date();
  const formattedDate = formatDate(clientDate);

  const [isEditMode, setIsEditMode] = useState(false);

  const [modalState, setModalState] = useState<{
    isVisible: boolean;
    itemToEdit: Habit | null;
  }>({
    isVisible: false,
    itemToEdit: null,
  });

  const isAllHabitsCompleted = habits.every((habit) => habit.isCompleted);

  // Queries
  const { isLoading, isError, error } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: habitsLogic.fetchHabits,
  });

  // Handlers

  const toggleHabit = async (habit: Habit) => {
    try {
      await habitsLogic.toggleHabit(habit.id, !habit.isCompleted);
      // Invalidate and refetch habits after toggling
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
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
      await habitsLogic.updateHabit(habitId, newHabitName);
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
      await authLogic.logout();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Render methods

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Habit>) => (
    <DailyHabitItem
      item={item}
      onToggle={() => toggleHabit(item)}
      isEditMode={isEditMode}
      onEditPress={() => {
        setModalState({
          isVisible: true,
          itemToEdit: item,
        });
      }}
      onDeletePress={() => {
        // TODO: Are you sure you want to delete this habit?
        habitsLogic.deleteHabit(item.id);
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      }}
      onReorderPress={isEditMode ? drag : undefined}
      isReordering={isActive}
    />
  );

  const renderRefreshControl = () => (
    <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
  );

  const renderErrorState = () => (
    <Text>{error instanceof Error ? error.message : "An error occurred"}</Text>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <Text style={styles.emptyStateText}>No habits yet!</Text>
      <Text style={styles.emptyStateText}>
        🚀 Add a habit to get started 🚀
      </Text>
    </View>
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <OptionsMenu
          isEditMode={isEditMode}
          toggleEditMode={toggleEditMode}
          onLogoutPress={handleLogoutPress}
        />
      ),
    });
  }, [navigation, isEditMode, toggleEditMode, handleLogoutPress]);

  // Screen
  return (
    <View style={styles.container}>
      <Text style={styles.dateHeader}>
        {isAllHabitsCompleted ? `✅ ${formattedDate}` : formattedDate}
      </Text>
      {isError ? (
        renderErrorState()
      ) : (
        <DraggableFlatList
          contentContainerStyle={styles.list}
          data={habits}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          refreshing={isLoading}
          refreshControl={renderRefreshControl()}
          ListEmptyComponent={renderEmptyState()}
          onDragEnd={({ data }) => {
            const updatedHabits = data.map((habit, index) => ({
              id: habit.id,
              priority: index + 1,
            }));
            console.log("updatedHabits", updatedHabits);
          }}
        />
      )}
      {isEditMode ||
        (!isAllHabitsCompleted && (
          <FAB
            icon="plus"
            label="Add Habit"
            onPress={() => {
              setModalState({
                isVisible: true,
                itemToEdit: null,
              });
            }}
            style={styles.addButton}
          />
        ))}
      <AddHabitModal
        visible={modalState.isVisible}
        itemToEdit={modalState.itemToEdit}
        onClose={handleModalClose}
        onAddSubmitted={handleAddHabit}
        onEditSubmitted={handleEditHabitSubmit}
      />
    </View>
  );
};

// Styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dateHeader: {
    marginHorizontal: 8,
    marginVertical: 16,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  list: {
    marginHorizontal: 8,
  },
  addButton: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 16,
    color: "#888",
  },
});

export default DailyHabitsScreen;
