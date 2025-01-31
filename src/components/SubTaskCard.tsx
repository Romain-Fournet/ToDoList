import { Pressable, StyleSheet, View, Text } from "react-native";
import { Row } from "./Row";
import { CheckBox } from "./CheckBox";
import { ThemedText } from "./ThemedText";
import { Task } from "../types";
import { CategoryLabel } from "./CategoryLabel";
import { useEffect } from "react";
import { useTheme } from "@react-navigation/native";
import { ButtonIcons } from "../consts/ButtonIcons";
import { Button } from "./Button";
import { TextInput } from "react-native-gesture-handler";

type Props = {
  subTask: Task;
  deleteSubTask?: (id: number) => void;
  toggleTaskCompletion?: (id: number, subId: number) => void;
  setSubTaskName?: (id: number, name: string) => void;
};

export function SubTaskCard({
  subTask,
  toggleTaskCompletion,
  deleteSubTask,
  setSubTaskName,
}: Props) {
  const { colors } = useTheme();

  const displayMode = (): "Modify" | "Using" | "Unknow Mode" => {
    if (deleteSubTask && setSubTaskName && !toggleTaskCompletion) {
      return "Modify";
    } else if (!deleteSubTask && toggleTaskCompletion) {
      return "Using";
    }
    return "Unknow Mode";
  };

  const handleOnBlur = (text: string) => {
    if (!text) {
      deleteSubTask!(subTask.id);
    }
  };

  if (displayMode() === "Using") {
    return (
      <View style={[styles.body, { backgroundColor: colors.background }]}>
        <Row gap={16}>
          <Pressable
            onPress={() => {
              toggleTaskCompletion!(subTask.mainTaskId ?? 0, subTask.id);
            }}
          >
            <CheckBox checked={subTask.isComplete} />
          </Pressable>
          <ThemedText variant="body" textStyle="normal">
            {subTask.name}
          </ThemedText>
        </Row>
      </View>
    );
  } else if (displayMode() === "Modify") {
    return (
      <Row style={styles.body}>
        <Row style={styles.content} gap={16}>
          <CheckBox checked={subTask.isComplete} />
          <TextInput
            style={styles.input}
            value={subTask.name}
            onChangeText={(text) => setSubTaskName!(subTask.id, text)}
            onBlur={() => handleOnBlur(subTask.name)}
          />
        </Row>
        <Button
          onPress={() => deleteSubTask!(subTask.id)}
          icon="littleClose"
          style={{ backgroundColor: "none", height: "auto" }}
        ></Button>
      </Row>
    );
  }
  return <Text>Some props is missing</Text>;
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 16,
    paddingLeft: 36,
    paddingRight: 20,
    justifyContent: "space-between",
    width: "100%",
  },
  content: {
    flex: 1,
  },
  input: {
    fontSize: 17,
    lineHeight: 21,
    flex: 1,
  },
});
