import { CategoriesSection } from "./CategoriesSection";
import { TasksList } from "./TasksList";
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
    </>
  );
}
