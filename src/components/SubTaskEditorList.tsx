import { FlatList, View } from "react-native";
import { SubTaskCard } from "@components/SubTaskCard";
import { Task } from "@types";

type SubTaskEditorListProps = {
  subTasks: Task[];
  deleteSubTask: (id: number) => void;
  setSubTaskName: (id: number, name: string) => void;
};

export function SubTaskEditorList({
  subTasks,
  deleteSubTask,
  setSubTaskName,
}: SubTaskEditorListProps) {
  return (
    <FlatList
      data={subTasks}
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
  );
}
