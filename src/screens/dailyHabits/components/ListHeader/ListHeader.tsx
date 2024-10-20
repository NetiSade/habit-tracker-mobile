import { useMemo } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
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
  style?: StyleProp<ViewStyle>;
}

const ListHeader = ({
  completedHabitsCount,
  totalHabitsCount,
  style,
}: ListHeaderProps) => {
  const clientDate = new Date();
  const formattedDate = formatDate(clientDate);
  const isEmptyState = totalHabitsCount === 0;

  // const successMsg = useMemo(() => {
  //   const successEmoji = getRandomPositiveEmoji();
  //   const successText = getRandomSuccessText();
  //   return `${successEmoji} ${successText} ${successEmoji}`;
  // }, []);

  const successMsg = useMemo(() => {
    const successEmoji = getRandomPositiveEmoji();
    return `All done for today! 🎉${successEmoji}`;
  }, []);

  const motivationalMsg = useMemo(() => getRandomMotivationalText(), []);

  const isAllHabitsCompleted = completedHabitsCount === totalHabitsCount;

  return (
    <View style={[styles.dateHeaderContainer, style]}>
      {!isEmptyState && (
        <ThemedText style={styles.subtitle} type="subtitle">
          My Daily Habits
        </ThemedText>
      )}

      <ThemedText style={styles.dateHeaderText} type="title">
        {formattedDate}
      </ThemedText>

      {!isEmptyState && (
        <ThemedText style={styles.successMsg} type="subtitle">
          {isAllHabitsCompleted ? successMsg : motivationalMsg}
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
    fontSize: 16,
    marginTop: 8,
    fontStyle: "italic",
  },
  subtitle: {
    fontSize: 16,
  },
});

export default ListHeader;
