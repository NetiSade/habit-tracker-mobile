import { Habit } from "@/src/types/habit";
import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

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
        <View style={styles.modalView}>
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
            <TouchableOpacity
              style={[styles.button, styles.buttonCancel]}
              onPress={onClose}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonAdd]}
              onPress={handleAddOrUpdate}
            >
              <Text style={styles.textStyle}>
                {itemToEdit ? "Update" : "Add"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10,
  },
  buttonCancel: {
    backgroundColor: "#2196F3",
  },
  buttonAdd: {
    backgroundColor: "#4CAF50",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});
