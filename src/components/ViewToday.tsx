import { StyleSheet, View } from "react-native";
import { CategoriesSection } from "./CategoriesSection";
import { HeaderDate } from "./HeaderDate";
import { TasksList } from "./TasksList";
import { Button } from "./Button";
import { useNavigation } from "@react-navigation/native";
import { useTaskContext } from "./context/TaskContext";

export function ViewToday() {
  const navigation = useNavigation();
  const { tasks, toggleTaskCompletion, deleteTask, toggleSubTaskCompletion } =
    useTaskContext();
  return (
    <>
      <CategoriesSection />
      <TasksList
        tasks={tasks}
        deleteTask={deleteTask}
        toggleSubTaskCompletion={toggleSubTaskCompletion}
        toggleTaskCompletion={toggleTaskCompletion}
      />
      <Button
        style={styles.addButton}
        onPress={() => navigation.navigate("AddTask")}
        icon="plus"
      />
    </>
  );
}

const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    bottom: -70,
    right: 0,
    width: 60,
  },
});
