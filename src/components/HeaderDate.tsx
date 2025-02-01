import { Row } from "@components/Row";
import { ThemedText } from "@components/ThemedText";
import { StyleSheet } from "react-native";
import { getTodayDate } from "src/functions/date";

type Props = {
  beforeText: string;
};

export function HeaderDate({ beforeText }: Props) {
  return (
    <Row style={styles.date} gap={10}>
      <ThemedText
        variant="heading"
        textStyle="normal"
        style={{ fontWeight: "bold" }}
      >
        {beforeText}
      </ThemedText>
      <ThemedText
        variant="heading"
        textStyle="faded"
        style={{ fontWeight: "medium" }}
      >
        {getTodayDate()}
      </ThemedText>
    </Row>
  );
}

const styles = StyleSheet.create({
  date: {
    paddingHorizontal: 10,
  },
});
