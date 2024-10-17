import { View, StyleSheet } from "react-native";
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
            onPress={onToggle}
            status={item.isCompleted ? "checked" : "unchecked"}
            uncheckedColor="black"
            color="green"
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
  habitText: {
    fontSize: 18,
    fontWeight: "500",
  },
  completedHabit: {
    fontWeight: "normal",
  },
  editActions: {
    flexDirection: "row",
  },
});

export default DailyHabitItem;
