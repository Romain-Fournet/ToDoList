import { Row } from "@components/Row";
import { ThemedText } from "@components/ThemedText";
import { Pressable, StyleSheet } from "react-native";
import { getTodayDate } from "src/functions/date";
import { useAppContext } from "./context/AppContext";
import { useNavigation } from "@react-navigation/native";

export function HeaderDate() {
  const { view, setView } = useAppContext();
  const navigation = useNavigation();

  const handleRowPressed = () => {
    const newView = view === "Calendar" ? "Today" : "Calendar";
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
          {getTodayDate()}
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
