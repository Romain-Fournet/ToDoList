import { FlatList, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SubTaskCard } from "@components/SubTaskCard";
import { Task } from "@types";
import { NewSubTaskInput } from "./NewSubTaskInput";

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
  return (
    <>
      <GestureHandlerRootView style={styles.container}>
        <NewSubTaskInput addSubTask={addSubTask} />
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
  container: {
    rowGap: 32,
  },
});
