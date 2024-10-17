import { View, StyleSheet } from "react-native";
import { Title } from "react-native-paper";

const EmptyState = () => {
  return (
    <View style={styles.container}>
      <Title style={styles.emptyStateText}>No habits yet</Title>
      <Title style={styles.emptyStateText}>
        🚀 Add habits to get started 🚀
      </Title>
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
