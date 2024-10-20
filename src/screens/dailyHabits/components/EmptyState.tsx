import { ThemedText } from "@/components/ThemedText";
import { View, StyleSheet } from "react-native";
import { Title } from "react-native-paper";

const EmptyState = () => {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.emptyStateText} type="title">
        No habits yet
      </ThemedText>
      <ThemedText style={styles.emptyStateText} type="title">
        🚀 Add habits to get started 🚀
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  emptyStateText: {
    fontSize: 16,
    fontStyle: "italic",
  },
});

export default EmptyState;
