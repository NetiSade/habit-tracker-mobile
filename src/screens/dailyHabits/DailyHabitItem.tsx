import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { Habit } from "@/src/types/habit";

interface DailyHabitItemProps {
  item: Habit;
  onToggle: () => void;
}

export const DailyHabitItem = ({ item, onToggle }: DailyHabitItemProps) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onToggle}>
      <View style={styles.checkbox}>
        {item.isCompleted ? (
          <Ionicons name="checkbox" size={24} color="green" />
        ) : (
          <Ionicons name="square-outline" size={24} color="black" />
        )}
      </View>
      <Text
        style={[styles.habitText, item.isCompleted && styles.completedHabit]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
    color: "gray",
  },
});

export default DailyHabitItem;
