import { Row } from "@components/Row";
import { CheckBox } from "@components/CheckBox";
import { FlatList, StyleSheet, TextInput, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SubTaskCard } from "./SubTaskCard";
import { useState } from "react";
import { Task } from "@types";

type Props = {
  mainTask: Task;
  addSubTask: (name: string) => void;
  deleteSubTask: (id: number) => void;
  setSubTaskName: (id: number, name: string) => void;
};

export function SubTaskSection({
  mainTask,
  addSubTask,
  deleteSubTask,
  setSubTaskName,
}: Props) {
  const [newSubTaskName, setNewSubTaskName] = useState("");
  const handleBlur = () => {
    if (newSubTaskName) {
      addSubTask(newSubTaskName);
      setNewSubTaskName("");
    }
  };

  return (
    <>
      <Row style={styles.subTask} gap={16}>
        <CheckBox checked={false} />
        <TextInput
          value={newSubTaskName}
          placeholder="Add subtask"
          onChangeText={(text) => setNewSubTaskName(text)}
          onBlur={() => handleBlur()}
          style={{ fontSize: 17 }}
        />
      </Row>
      <GestureHandlerRootView>
        <FlatList
          data={mainTask.subTasks}
          renderItem={({ item }) => (
            <SubTaskCard
              subTask={item}
              deleteSubTask={deleteSubTask}
              setSubTaskName={setSubTaskName}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 32 }} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  subTask: {
    paddingLeft: 36,
  },
});
