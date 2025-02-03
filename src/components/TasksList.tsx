import { FlatList, Pressable, View, Text, StyleSheet } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { TaskCard } from "./TaskCard";
import { SubTaskCard } from "./SubTaskCard";
import { useTaskContext } from "./context/TaskContext";
import { Task } from "@types";
import { useNavigation, useTheme } from "@react-navigation/native";
import { serializeTask } from "src/functions/task";
import { SubTaskDisplayList } from "./SubTaskDisplayList";
import { DeleteTaskRowBack } from "./DeleteTaskRowBack";

type Props = {
  tasks: Task[];
  toggleTaskCompletion: (id: number) => void;
  toggleSubTaskCompletion: (mainTaskId: number, subTaskId: number) => void;
  deleteTask: (id: number) => void;
};
export function TasksList({
  tasks,
  toggleTaskCompletion,
  toggleSubTaskCompletion,
  deleteTask,
}: Props) {
  const { colors } = useTheme();

  return (
    <SwipeListView
      data={tasks}
      disableRightSwipe={true}
      stopRightSwipe={-112}
      rightOpenValue={-112}
      renderItem={({ item }) => (
        <View style={{ backgroundColor: colors.background }}>
          <TaskCard
            key={item.id}
            task={item}
            toggleTaskCompletion={toggleTaskCompletion}
          >
            {item.subTasks.length > 0 && (
              <SubTaskDisplayList
                subTasks={item.subTasks}
                toggleSubTaskCompletion={toggleSubTaskCompletion}
              />
            )}
          </TaskCard>
        </View>
      )}
      //TODO Rerendre la hauteur du renderHiddenItem a chaque fois qu'on revient sur la page
      renderHiddenItem={({ item }) => (
        <DeleteTaskRowBack deleteTask={deleteTask} taskId={item.id} />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}
