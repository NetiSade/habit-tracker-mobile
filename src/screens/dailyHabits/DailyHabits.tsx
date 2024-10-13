import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { useAppStore } from "@/src/store";
import { habitsLogic } from "@/src/logic/habitsLogic";
import { Habit } from "@/src/types/habit";
import { AddHabitModal } from "@/src/components/modals/AddHabitModal";
import DailyHabitItem from "./DailyHabitItem";
import { formatDate } from "./utils";

const QUERY_KEY = "habits";

const DailyHabitsScreen = () => {
  // States
  const { habits } = useAppStore();
  const queryClient = useQueryClient();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const clientDate = new Date();
  const formattedDate = formatDate(clientDate);

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

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const onRefresh = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
  };

  // Render methods

  const renderItem = ({ item }: { item: Habit }) => (
    <DailyHabitItem item={item} onToggle={() => toggleHabit(item)} />
  );

  const renderRefreshControl = () => (
    <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
  );

  const renderErrorState = () => (
    <Text>{error instanceof Error ? error.message : "An error occurred"}</Text>
  );

  const renderEmptyState = () => <Text>No habits found</Text>;

  // Component

  return (
    <View style={styles.container}>
      <Text style={styles.dateHeader}>{formattedDate}</Text>
      {isError ? (
        renderErrorState()
      ) : (
        <FlatList
          contentContainerStyle={styles.list}
          data={habits}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          refreshing={isLoading}
          refreshControl={renderRefreshControl()}
          ListEmptyComponent={renderEmptyState()}
        />
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Ionicons name="add" size={24} color="white" fontWeight="bold" />
      </TouchableOpacity>
      <AddHabitModal
        visible={isModalVisible}
        onClose={handleModalClose}
        onAdd={handleAddHabit}
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
    padding: 10,
    bottom: 20,
    borderRadius: 50,
    backgroundColor: "#4A90E2",
    alignSelf: "center",
  },
});

export default DailyHabitsScreen;
