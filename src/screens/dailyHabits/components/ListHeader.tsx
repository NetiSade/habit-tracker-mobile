import { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Title } from "react-native-paper";
import { formatDate } from "./utils";

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

  const getRandomPositiveEmoji = () => {
    const emojis = ["🚀", "🌟", "🎉", "💪", "👏", "🙌", "🔥"];
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  const getRandomMotivationalText = () => {
    const texts = [
      "You can do it!",
      "Just do it!",
      "Let's go!",
      "One step at a time!",
      "Every small step counts!",
      "Progress is progress!",
      "Consistency creates change!",
      "One habit at a time!",
      "Your future self will thank you!",
      "It's all about progress!",
      "Don't overthink it!",
    ];
    return texts[Math.floor(Math.random() * texts.length)];
  };

  const getRandomSuccessText = () => {
    const texts = [
      "You're doing great!",
      "Keep it up!",
      "You're amazing!",
      "You're unstoppable!",
      "You're a rockstar!",
    ];
    return texts[Math.floor(Math.random() * texts.length)];
  };

  const successMsg = useMemo(() => {
    const successEmoji = getRandomPositiveEmoji();
    const successText = getRandomSuccessText();
    return `${successEmoji} ${successText} ${successEmoji}`;
  }, []);

  const motivationalMsg = useMemo(() => getRandomMotivationalText(), []);

  const isAllHabitsCompleted = completedHabitsCount === totalHabitsCount;

  return (
    <View style={styles.dateHeaderContainer}>
      <Title style={styles.dateHeaderText}>{formattedDate}</Title>

      {!isEmptyState && (
        <Title style={styles.successMsg}>
          {isAllHabitsCompleted ? successMsg : motivationalMsg}
        </Title>
      )}

      {!isEmptyState && (
        <Title style={styles.subtitle}>
          {`My Daily Habits (${completedHabitsCount} / ${totalHabitsCount})`}
        </Title>
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
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
  },
  successMsg: {
    fontSize: 16,
    fontStyle: "italic",
  },
});

export default ListHeader;
