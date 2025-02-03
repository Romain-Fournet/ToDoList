import { FlatList, View } from "react-native";
import { SubTaskCard } from "./SubTaskCard";
import { Task } from "@types";

type Props = {
  subTasks: Task[];
  toggleSubTaskCompletion: (mainId: number, subId: number) => void;
};

export function SubTaskDisplayList({
  subTasks,
  toggleSubTaskCompletion,
}: Props) {
  return (
    <FlatList
      data={subTasks}
      renderItem={({ item }) => (
        <SubTaskCard
          key={item.id}
          toggleSubTaskCompletion={toggleSubTaskCompletion}
          subTask={item}
        />
      )}
      ItemSeparatorComponent={() => <View style={{ height: 20 }}></View>}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}
