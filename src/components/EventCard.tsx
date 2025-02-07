import { Pressable, StyleSheet, View } from "react-native";
import { Row } from "./Row";
import { ThemedText } from "./ThemedText";
import { Task } from "@types";

type Props = {
  task: Task;
  style: { width: number; height: number; top: number; left: number };
};

export function EventCard({ task, style }: Props) {
  return (
    <Pressable style={[style, styles.container]}>
      <View
        style={[
          styles.background,
          {
            backgroundColor: task.category.color,
          },
        ]}
      />
      <Row gap={8}>
        <View
          style={[
            styles.contain,
            {
              backgroundColor: task.category.color,
            },
          ]}
        />
        <ThemedText textStyle="normal" variant="body">
          {task.name}
        </ThemedText>
      </Row>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    borderRadius: 8,
    padding: 16,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
    opacity: 0.1,
  },
  contain: {
    height: 16,
    width: 16,
    borderRadius: 8,
  },
});
