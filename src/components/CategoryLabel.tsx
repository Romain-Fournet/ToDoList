import { Category } from "../types";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@components/ThemedText";
import { Colors } from "@const/Colors";

type Props = { category: Category; selected?: boolean };

export function CategoryLabel({ category, selected }: Props) {
  if (!category) {
    return null;
  }

  const backgroundColor =
    selected || selected === undefined
      ? { backgroundColor: category.color, opacity: 0.1 }
      : { backgroundColor: Colors.lightGrey };
  const textColor =
    selected || selected === undefined
      ? { color: category.color }
      : { color: Colors.grey };

  return (
    <View style={styles.body}>
      <View style={[styles.background, backgroundColor]} />
      <ThemedText variant="subtitle" style={[textColor, styles.text]}>
        {category.name.toUpperCase()}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 4,
    overflow: "hidden",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    fontWeight: "semibold",
  },
});
