import React, { useLayoutEffect } from "react";
import { View, Text, StyleSheet, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import { FAB } from "react-native-paper";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";

import { Habit } from "@/src/types/habit";
import { AddHabitModal } from "@/src/components/modals/AddHabitModal";
import DailyHabitItem from "./components/DailyHabitItem";
import OptionsMenu from "./components/OptionsMenu";
import ListHeader from "./components/ListHeader";
import EmptyState from "./components/EmptyState";
import { useDailyHabits } from "./useDailyHabits";
import ErrorState from "./components/ErrorState";

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

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.listContainer}>
        <DraggableFlatList
          ListHeaderComponent={
            <ListHeader
              completedHabitsCount={completedHabitsCount}
              totalHabitsCount={habits.length}
            />
          }
          ListHeaderComponentStyle={styles.listHeaderContainer}
          data={habits}
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
        />
      </SafeAreaView>

      <FAB
        icon="plus"
        label="Add Habit"
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
    </View>
  );
};

// Styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8E8E8",
  },
  listContainer: {
    flex: 1,
    marginBottom: 16,
  },
  listHeaderContainer: {
    marginBottom: 16,
  },
  addButton: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default DailyHabitsScreen;
