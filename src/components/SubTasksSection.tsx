import { FlatList, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SubTaskCard } from "@components/SubTaskCard";
import { Task } from "@types";
import { NewSubTaskInput } from "./NewSubTaskInput";
import { SubTaskEditorList } from "./SubTaskEditorList";

type Props = {
  subTasks: Task[];
  addSubTask: (name: string) => void;
  deleteSubTask: (id: number) => void;
  setSubTaskName: (id: number, name: string) => void;
};

export function SubTaskSection({
  subTasks,
  addSubTask,
  deleteSubTask,
  setSubTaskName,
}: Props) {
  return (
    <>
      <GestureHandlerRootView style={styles.container}>
        <NewSubTaskInput addSubTask={addSubTask} />
        <SubTaskEditorList
          subTasks={subTasks}
          deleteSubTask={deleteSubTask}
          setSubTaskName={setSubTaskName}
        />
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: 32,
  },
});
