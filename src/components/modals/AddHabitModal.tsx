import { ThemedText } from "@/components/ThemedText";
import ThemedTextInput from "@/components/ThemedTextInput";
import { Habit } from "@/src/types/habit";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, Card, Modal } from "react-native-paper";

interface AddHabitModalProps {
  visible: boolean;
  onClose: () => void;
  onAddSubmitted: (habitName: string) => void;
  onEditSubmitted: (habitId: string, newHabitName: string) => void;
  itemToEdit: Habit | null;
}

export const AddHabitModal: React.FC<AddHabitModalProps> = ({
  visible,
  itemToEdit,
  onClose,
  onAddSubmitted,
  onEditSubmitted,
}) => {
  const [habitName, setHabitName] = useState("");

  useEffect(() => {
    setHabitName(itemToEdit?.name ?? "");
  }, [itemToEdit]);

  const handleAddOrUpdate = () => {
    if (habitName.trim()) {
      if (itemToEdit) {
        onEditSubmitted(itemToEdit.id, habitName.trim());
      } else {
        onAddSubmitted(habitName.trim());
      }
      onClose();
    }
  };

  const handleClose = () => {
    setHabitName("");
    onClose();
  };

  return (
    <Modal visible={visible} onDismiss={handleClose}>
      <Card style={styles.modalView}>
        <ThemedText style={styles.title}>
          {itemToEdit ? "Edit Habit" : "Add New Habit"}
        </ThemedText>
        <ThemedTextInput
          style={styles.input}
          value={habitName}
          onChangeText={setHabitName}
          autoFocus
          placeholder="Enter habit name"
        />
        <View style={styles.buttonContainer}>
          <Button
            onPress={handleAddOrUpdate}
            mode="contained"
            disabled={!habitName.trim()}
          >
            {itemToEdit ? "Update" : "Add"}
          </Button>
          <Button onPress={handleClose} mode="text">
            Cancel
          </Button>
        </View>
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flexGrow: 1,
    padding: 16,
    marginHorizontal: 32,
  },
  title: {
    textAlign: "center",
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 16,
  },
  input: {
    marginHorizontal: 16,
  },
});
