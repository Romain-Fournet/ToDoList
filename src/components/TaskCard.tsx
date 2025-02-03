import { Pressable, StyleSheet, View } from "react-native";
import { Row } from "./Row";
import { CheckBox } from "@components/CheckBox";
import { ThemedText } from "@components/ThemedText";
import { Task } from "@types";
import { CategoryLabel } from "./CategoryLabel";
import { serializeTask } from "src/functions/task";
import { useNavigation } from "@react-navigation/native";

type Props = {
  children?: React.ReactNode;
  task: Task;
  toggleTaskCompletion: (id: number) => void;
};

export function TaskCard({ task, toggleTaskCompletion, children }: Props) {
  const navigation = useNavigation();

  const handleTaskCardPressed = () => {
    navigation.navigate("ViewTask", {
      task: serializeTask(task),
    });
  };

  return (
    <Pressable onPress={() => handleTaskCardPressed()}>
      <View style={styles.body}>
        <Row gap={16}>
          <Pressable
            onPress={() => {
              toggleTaskCompletion(task.id);
            }}
          >
            <CheckBox checked={task.isComplete} />
          </Pressable>
          <ThemedText variant="body" textStyle="normal">
            {task.name}
          </ThemedText>
        </Row>
        <Row gap={16}>
          <View style={{ width: 26, height: 26 }}></View>
          <CategoryLabel category={task.category ?? undefined} />
        </Row>
        {children && <View style={styles.childrenWraper}>{children}</View>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#D9D9D9",
  },
  childrenWraper: {
    marginTop: 20,
  },
});
