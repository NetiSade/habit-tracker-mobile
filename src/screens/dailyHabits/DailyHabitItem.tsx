import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Card, Checkbox, IconButton, Title } from "react-native-paper";

import { Habit } from "@/src/types/habit";

interface DailyHabitItemProps {
  item: Habit;
  isEditMode: boolean;
  onToggle: () => void;
  onEditPress: () => void;
  onDeletePress: () => void;
  // reorder
  onReorderPress: (() => void) | undefined;
  isReordering: boolean;
}

export const DailyHabitItem = ({
  item,
  onToggle,
  isEditMode,
  onEditPress,
  onDeletePress,
  onReorderPress,
  isReordering,
}: DailyHabitItemProps) => {
  return (
    <Card
      style={[styles.card, { opacity: isReordering ? 0.7 : 1 }]}
      onPress={isEditMode ? undefined : onToggle}
      onLongPress={isEditMode ? onReorderPress : undefined}
    >
      <Card.Content style={styles.cardContent}>
        {!isEditMode && (
          <Checkbox
            status={item.isCompleted ? "checked" : "unchecked"}
            onPress={onToggle}
            color="green" // Checked color
            uncheckedColor="black" // Unchecked border color (set it to a contrasting color)
          />
        )}
        {isEditMode && (
          <IconButton icon="drag" size={24} onLongPress={onReorderPress} />
        )}
        <Title
          style={[styles.habitText, item.isCompleted && styles.completedHabit]}
        >
          {item.name}
        </Title>
        {isEditMode && (
          <View style={styles.editActions}>
            <IconButton
              icon="pencil"
              onPress={onEditPress}
              size={18}
              mode="contained-tonal"
            />
            <IconButton
              icon="delete"
              onPress={onDeletePress}
              size={18}
              mode="contained-tonal"
            />
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    elevation: 2,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  checkbox: {
    marginHorizontal: 16,
  },
  habitText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  completedHabit: {
    color: "gray",
  },
  editActions: {
    flexDirection: "row",
  },
});

export default DailyHabitItem;
