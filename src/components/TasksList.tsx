import { FlatList, Pressable, View, Text, StyleSheet } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { TaskCard } from "./TaskCard";
import { SubTaskCard } from "./SubTaskCard";
import { useTaskContext } from "./context/TaskContext";
import { Task } from "@types";
import { useNavigation, useTheme } from "@react-navigation/native";
import { serializeTask } from "src/functions/task";

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
  const navigation = useNavigation();
  return (
    <SwipeListView
      data={tasks}
      disableRightSwipe={true}
      stopRightSwipe={-112}
      rightOpenValue={-112}
      //TODO Rerendre la hauteur du renderHiddenItem a chaque fois qu'on revient sur la page
      renderItem={({ item }) => (
        <View style={{ backgroundColor: colors.background }}>
          <Pressable
            onPress={() =>
              navigation.navigate("ViewTask", {
                task: serializeTask(item),
              })
            }
          >
            <TaskCard
              key={item.id}
              task={item}
              toggleTaskCompletion={toggleTaskCompletion}
            >
              {item.subTasks.length > 0 && (
                <FlatList
                  data={item.subTasks}
                  renderItem={({ item }) => (
                    <SubTaskCard
                      key={item.id}
                      toggleSubTaskCompletion={toggleSubTaskCompletion}
                      subTask={item}
                    />
                  )}
                  ItemSeparatorComponent={() => (
                    <View style={{ height: 20 }}></View>
                  )}
                  keyExtractor={(item) => item.id.toString()}
                ></FlatList>
              )}
            </TaskCard>
          </Pressable>
        </View>
      )}
      renderHiddenItem={({ item }) => (
        <View style={styles.rowBack}>
          <View style={{ backgroundColor: colors.background }}></View>
          <Pressable
            style={styles.rowBackRight}
            onPress={() => deleteTask(item.id)}
          >
            <View>
              <Text style={{ color: "white" }}>Delete</Text>
            </View>
          </Pressable>
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

const styles = StyleSheet.create({
  rowBack: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    zIndex: -1,
  },
  rowBackRight: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: 112,
    backgroundColor: "#FF2B4E",
    alignItems: "center",
    justifyContent: "center",
  },
});
