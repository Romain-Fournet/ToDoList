import { Row } from "@components/Row";
import { ThemedText } from "@components/ThemedText";
import { Pressable, StyleSheet } from "react-native";
import { getTodayDate } from "src/functions/date";
import { useHomeContext } from "./context/HomeContext";

export function HeaderDate() {
  const { view, date, setView, setDate } = useHomeContext();

  const handleRowPressed = () => {
    const newView = view === "Calendar" ? "Today" : "Calendar";
    if (newView === "Today") {
      setDate(getTodayDate());
    }
    setView(newView);
  };

  return (
    <Pressable onPress={() => handleRowPressed()}>
      <Row style={styles.date} gap={10}>
        <ThemedText
          variant="heading"
          textStyle="normal"
          style={{ fontWeight: "bold" }}
        >
          {view}
        </ThemedText>
        <ThemedText
          variant="heading"
          textStyle="faded"
          style={{ fontWeight: "medium" }}
        >
          {date}
        </ThemedText>
      </Row>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  date: {
    paddingHorizontal: 10,
  },
});
