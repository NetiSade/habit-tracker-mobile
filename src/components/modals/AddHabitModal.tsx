import { Habit } from "@/src/types/habit";
import React, { useEffect, useState } from "react";
import { Modal, View, StyleSheet, Text } from "react-native";
import { Button, Card, TextInput } from "react-native-paper";

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

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      onDismiss={() => {
        setHabitName("");
      }}
    >
      <View style={styles.centeredView}>
        <Card style={styles.modalView}>
          <Text style={styles.modalText}>
            {itemToEdit ? "Edit Habit" : "Add New Habit"}
          </Text>
          <TextInput
            value={habitName}
            style={styles.input}
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
            <Button onPress={onClose} mode="text">
              Cancel
            </Button>
          </View>
        </Card>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    padding: 16,
  },
  input: {
    width: 200,
    marginHorizontal: 8,
    marginVertical: 16,
    borderWidth: 1,
  },
  buttonContainer: {
    marginTop: 8,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});
