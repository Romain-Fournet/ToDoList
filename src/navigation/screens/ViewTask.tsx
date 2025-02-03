import { Button } from "@components/Button";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useTaskContext } from "@components/context/TaskContext";
import { Task } from "../../types";
import type { StaticScreenProps } from "@react-navigation/native";
import { useTask } from "../../hooks/useTask";
import { deserializeTask } from "../../functions/task";
import { useNewSubTaskContext } from "@components/context/NewSubTaskContext";
import { TaskName } from "@components/TaskName";
import { SubTaskSection } from "@components/SubTasksSection";
import { TaskActionsSection } from "@components/TaskActionsSection";

type Props = StaticScreenProps<{
  task: Task;
}>;

export function ViewTask({ route }: Props) {
  const navigation = useNavigation();

  const {
    task,
    setTaskName,
    setTaskCategory,
    addSubTask,
    deleteSubTask,
    setSubTaskName,
    setTaskDate,
  } = useTask(deserializeTask(route.params.task));

  const { newSubTaskName, setNewSubTaskName } = useNewSubTaskContext();

  const { replaceTask } = useTaskContext();

  const onSavePress = () => {
    if (newSubTaskName) {
      addSubTask(newSubTaskName, replaceTask);
      setNewSubTaskName("");
    } else {
      replaceTask(task);
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Button
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
          icon="close"
        ></Button>
      </View>
      <View style={styles.top}>
        <TaskName setName={setTaskName} task={task} />
        <SubTaskSection
          addSubTask={addSubTask}
          deleteSubTask={deleteSubTask}
          setSubTaskName={setSubTaskName}
          subTasks={task.subTasks}
        />
      </View>
      <TaskActionsSection
        onSavePress={onSavePress}
        setTaskCategory={setTaskCategory}
        setTaskDate={setTaskDate}
        task={task}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "none",
  },
  body: {
    flex: 1,
  },
  top: {
    marginTop: 108,
    marginHorizontal: 30,
    rowGap: 32,
    flex: 1,
    alignItems: "flex-start",
  },
});
