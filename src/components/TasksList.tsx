import { View, LayoutChangeEvent } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { TaskCard } from "./TaskCard";
import { Task } from "@types";
import { useTheme } from "@react-navigation/native";
import { SubTaskDisplayList } from "./SubTaskDisplayList";
import { DeleteTaskRowBack } from "./DeleteTaskRowBack";
import { useEffect, useState } from "react";
import { useTaskContext } from "./context/TaskContext";

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
  const { totalTasks } = useTaskContext();

  const { colors } = useTheme();

  const [rowHeights, setRowHeights] = useState<{ [key: number]: number }>({});
  const [previousTotalTasks, setPreviousTotalTasks] = useState(totalTasks);

  const handleLayout = (taskId: number) => (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setRowHeights((prevHeights) => ({ ...prevHeights, [taskId]: height }));
  };

  const [listKey, setListKey] = useState(Date.now());

  useEffect(() => {
    if (totalTasks > previousTotalTasks) {
      setListKey(Date.now());
      setPreviousTotalTasks(totalTasks);
    }
  }, [totalTasks]);

  return (
    <SwipeListView
      data={tasks}
      key={listKey}
      disableRightSwipe={true}
      stopRightSwipe={-112}
      rightOpenValue={-112}
      renderItem={({ item }) => (
        <View
          style={{ backgroundColor: colors.background }}
          onLayout={handleLayout(item.id)}
        >
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
      renderHiddenItem={({ item }) => (
        <View style={{ height: rowHeights[item.id], flex: 1 }}>
          <DeleteTaskRowBack
            deleteTask={deleteTask}
            taskId={item.id}
            rowHeight={rowHeights[item.id]}
          />
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}
