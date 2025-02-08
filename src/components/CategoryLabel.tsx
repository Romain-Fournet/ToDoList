import { Category } from "../types";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@components/ThemedText";

type Props = { category: Category; selected?: boolean };

export function CategoryLabel({ category, selected }: Props) {
  if (!category) {
    return null;
  }

  const backgroundColor =
    selected || selected === undefined
      ? { backgroundColor: category.color }
      : { backgroundColor: "#666666" };
  const textColor =
    selected || selected === undefined
      ? { color: category.color }
      : { color: "#8a8a8a" };

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
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
  },
  text: {
    fontWeight: "semibold",
  },
});
