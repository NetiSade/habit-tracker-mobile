import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Checkbox, IconButton, Text } from "react-native-paper";
import { Habit } from "@/src/types/habit";
import { ThemedText } from "@/components/ThemedText";

interface DailyHabitItemProps {
  item: Habit;
  isEditMode: boolean;
  onToggle: () => void;
  onEditPress: () => void;
  onDeletePress: () => void;
  onReorderPress: (() => void) | undefined;
  isReordering: boolean;
}

export const DailyHabitItem: React.FC<DailyHabitItemProps> = ({
  item,
  onToggle,
  isEditMode,
  onEditPress,
  onDeletePress,
  onReorderPress,
  isReordering,
}) => {
  return (
    <Card
      style={{ opacity: isReordering ? 0.7 : 1 }}
      onPress={isEditMode ? undefined : onToggle}
      onLongPress={isEditMode ? onReorderPress : undefined}
    >
      <Card.Content style={styles.cardContent}>
        <View style={styles.leftContent}>
          {!isEditMode && (
            <Checkbox
              onPress={onToggle}
              status={item.isCompleted ? "checked" : "unchecked"}
              color="green"
            />
          )}
          {isEditMode && (
            <IconButton
              icon="drag"
              size={24}
              onLongPress={onReorderPress}
              style={styles.dragIcon}
            />
          )}
          <ThemedText
            style={[
              styles.habitText,
              item.isCompleted && styles.completedHabit,
            ]}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item.name}
          </ThemedText>
        </View>
        {isEditMode && (
          <View style={styles.editActions}>
            <IconButton
              icon="pencil"
              onPress={onEditPress}
              size={18}
              mode="contained-tonal"
              style={styles.iconButton}
            />
            <IconButton
              icon="delete"
              onPress={onDeletePress}
              size={18}
              mode="contained-tonal"
              style={styles.iconButton}
            />
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  habitText: {
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
    marginLeft: 8,
  },
  completedHabit: {
    fontWeight: "normal",
  },
  editActions: {
    flexDirection: "row",
    marginLeft: 8,
  },
  iconButton: {
    paddingVertical: 0,
    marginVertical: 0,
  },
  dragIcon: {
    padding: 0,
    margin: 0,
  },
});

export default DailyHabitItem;
