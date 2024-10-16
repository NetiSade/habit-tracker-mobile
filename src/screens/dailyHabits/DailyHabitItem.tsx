import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { Habit } from "@/src/types/habit";
import { IconButton } from "react-native-paper";

interface DailyHabitItemProps {
  item: Habit;
  isEditMode: boolean;
  onToggle: () => void;
  onEditPress: () => void;
  onDeletePress: () => void;
}

export const DailyHabitItem = ({
  item,
  onToggle,
  isEditMode,
  onEditPress,
  onDeletePress,
}: DailyHabitItemProps) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onToggle}>
      {!isEditMode && (
        <View style={styles.checkbox}>
          {item.isCompleted ? (
            <Ionicons name="checkbox" size={24} color="green" />
          ) : (
            <Ionicons name="square-outline" size={24} color="black" />
          )}
        </View>
      )}
      <Text
        style={[styles.habitText, item.isCompleted && styles.completedHabit]}
      >
        {item.name}
      </Text>
      {isEditMode && (
        <View style={styles.editActions}>
          <IconButton icon="pencil" size={20} onPress={onEditPress} />
          <IconButton icon="delete" size={20} onPress={onDeletePress} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  editActions: {
    flexDirection: "row",
  },
});

export default DailyHabitItem;
