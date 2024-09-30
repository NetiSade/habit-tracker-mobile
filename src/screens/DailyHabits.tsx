import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";

import { useHabitsStore } from "../store/habitsStore";
import { habitsLogic } from "../logic/habitsLogic";
import { Habit } from "../types/habit";

const QUERY_KEY = "habits";

const DailyHabits = () => {
  const { habits } = useHabitsStore();
  const queryClient = useQueryClient();

  const { isLoading, isError, error } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: habitsLogic.getHobbies,
  });

  const toggleHabit = async (habit: Habit) => {
    try {
      await habitsLogic.toggleHabit(habit.id);
      // Invalidate and refetch habits after toggling
      //queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    } catch (error) {
      console.error("Error toggling habit:", error);
    }
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return (
      <Text>
        {error instanceof Error ? error.message : "An error occurred"}
      </Text>
    );
  }

  const renderItem = ({ item }: { item: Habit }) => (
    <TouchableOpacity style={styles.item} onPress={() => toggleHabit(item)}>
      <View style={styles.checkbox}>
        {item.completed ? (
          <Ionicons name="checkbox" size={24} color="green" />
        ) : (
          <Ionicons name="square-outline" size={24} color="black" />
        )}
      </View>
      <Text style={[styles.habitText, item.completed && styles.completedHabit]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={habits}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 4,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  checkbox: {
    marginRight: 10,
  },
  habitText: {
    fontSize: 16,
  },
  completedHabit: {
    textDecorationLine: "line-through",
    color: "gray",
  },
});

export default DailyHabits;
