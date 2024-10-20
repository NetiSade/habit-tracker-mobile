import { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Title } from "react-native-paper";
import { formatDate } from "../utils";
import { ThemedText } from "@/components/ThemedText";
import {
  getRandomMotivationalText,
  getRandomPositiveEmoji,
  getRandomSuccessText,
} from "./utils";

interface ListHeaderProps {
  completedHabitsCount: number;
  totalHabitsCount: number;
}

const ListHeader = ({
  completedHabitsCount,
  totalHabitsCount,
}: ListHeaderProps) => {
  const clientDate = new Date();
  const formattedDate = formatDate(clientDate);
  const isEmptyState = totalHabitsCount === 0;

  const successMsg = useMemo(() => {
    const successEmoji = getRandomPositiveEmoji();
    const successText = getRandomSuccessText();
    return `${successEmoji} ${successText} ${successEmoji}`;
  }, []);

  const motivationalMsg = useMemo(() => getRandomMotivationalText(), []);

  const isAllHabitsCompleted = completedHabitsCount === totalHabitsCount;

  return (
    <View style={styles.dateHeaderContainer}>
      <ThemedText style={styles.dateHeaderText} type="title">
        {formattedDate}
      </ThemedText>

      {!isEmptyState && (
        <ThemedText style={styles.successMsg} type="subtitle">
          {isAllHabitsCompleted ? successMsg : motivationalMsg}
        </ThemedText>
      )}

      {!isEmptyState && (
        <ThemedText style={styles.subtitle} type="subtitle">
          {`My Daily Habits (${completedHabitsCount} / ${totalHabitsCount})`}
        </ThemedText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dateHeaderContainer: {
    alignItems: "center",
  },
  dateHeaderText: {
    fontSize: 20,
  },
  successMsg: {
    marginTop: 32,
    fontStyle: "italic",
  },
  subtitle: {
    marginTop: 16,
  },
});

export default ListHeader;
