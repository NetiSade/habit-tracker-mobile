import React, { useLayoutEffect } from "react";
import { View, StyleSheet, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import { Divider, FAB } from "react-native-paper";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";

import { Habit } from "@/src/types/habit";
import { AddHabitModal } from "@/src/components/modals/AddHabitModal";
import DailyHabitItem from "./components/DailyHabitItem";
import OptionsMenu from "./components/OptionsMenu";
import ListHeader from "./components/ListHeader/ListHeader";
import EmptyState from "./components/EmptyState";
import { useDailyHabits } from "./useDailyHabits";
import ErrorState from "./components/ErrorState";
import LoadingState from "./components/LoadingState";
import { ThemedView } from "@/components/ThemedView";

const DailyHabitsScreen = () => {
  const {
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
    handleDeleteHabit,
    handleOnDragEnd,
    handleModalClose,
    handleLogoutPress,
    toggleEditMode,
  } = useDailyHabits();

  const navigation = useNavigation();

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

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Habit>) => (
    <DailyHabitItem
      item={item}
      onToggle={() => toggleHabit(item)}
      isEditMode={isEditMode}
      onEditPress={() => {
        handleEditHabitPress(item);
      }}
      onDeletePress={() => {
        handleDeleteHabit(item.id);
      }}
      onReorderPress={isEditMode ? drag : undefined}
      isReordering={isActive}
    />
  );

  if (apiState.isError) {
    return <ErrorState />;
  }

  if (apiState.isLoading && habits.length === 0) {
    return <LoadingState />;
  }

  return (
    <ThemedView style={styles.container}>
      {!isEditMode && (
        <>
          <ListHeader
            completedHabitsCount={completedHabitsCount}
            totalHabitsCount={habits.length}
            style={styles.listHeaderContainer}
          />
          <Divider />
        </>
      )}

      <DraggableFlatList
        data={habits}
        contentContainerStyle={styles.listContentContainer}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshing={apiState.isLoading}
        refreshControl={
          <RefreshControl
            refreshing={apiState.isLoading}
            onRefresh={onRefresh}
          />
        }
        ListEmptyComponent={<EmptyState />}
        onDragEnd={handleOnDragEnd}
        ListFooterComponent={<View style={{ height: 200 }} />}
      />

      <FAB
        icon="plus"
        label={habits.length === 0 ? "Add a daily habit" : ""}
        onPress={handleCreateHabitPress}
        style={styles.addButton}
      />

      <AddHabitModal
        visible={modalState.isVisible}
        itemToEdit={modalState.itemToEdit}
        onClose={handleModalClose}
        onAddSubmitted={handleAddHabit}
        onEditSubmitted={handleEditHabitSubmit}
      />
    </ThemedView>
  );
};

// Styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
  listContentContainer: {
    padding: 16,
    gap: 8,
  },
  listHeaderContainer: {
    paddingVertical: 16,
  },
  addButton: {
    margin: 32,
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});

export default DailyHabitsScreen;
