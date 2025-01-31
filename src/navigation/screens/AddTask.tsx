import { Button } from "@components/Button";
import { useTaskContext } from "@components/context/TaskContext";
import { useTask } from "@hooks/useTask";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { TaskName } from "@components/TaskName";
import { SubTaskSection } from "@components/SubTasksSection";
import { TaskActionsPanel } from "@components/TaskActionsPanel";

export function AddTask() {
  const navigation = useNavigation();

  const { addTask } = useTaskContext();

  const {
    task,
    setTaskName,
    setTaskDate,
    setTaskCategory,
    addSubTask,
    deleteSubTask,
    setSubTaskName,
  } = useTask();

  const onSavePress = () => {
    addTask(task);
    navigation.goBack();
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View>
          {/* Close button */}
          <Button
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
            icon="close"
          />
        </View>
        <View style={styles.top}>
          <TaskName task={task} setName={setTaskName} />
          {task.name && (
            <SubTaskSection
              mainTask={task}
              addSubTask={addSubTask}
              deleteSubTask={deleteSubTask}
              setSubTaskName={setSubTaskName}
            />
          )}
        </View>

        <TaskActionsPanel
          onSavePress={onSavePress}
          setTaskCategory={setTaskCategory}
          setTaskDate={setTaskDate}
          task={task}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "none",
  },
  container: {
    flex: 1,
  },
  top: {
    marginTop: 108,
    marginHorizontal: 30,
    rowGap: 32,
    flex: 1,
    alignItems: "flex-start",
  },
  scrollContent: {
    flex: 1,
  },
});
