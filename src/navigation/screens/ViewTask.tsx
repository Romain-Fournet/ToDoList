import { Button } from "@components/Button";
import { CategoryLabel } from "@components/CategoryLabel";
import { CheckBox } from "@components/CheckBox";
import { Row } from "../../components/Row";
import { SubTaskCard } from "@components/SubTaskCard";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  View,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useCategoryContext } from "@components/context/CategoryContext";
import { useTaskContext } from "@components/context/TaskContext";
import { Category, Task } from "../../types";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import type { StaticScreenProps } from "@react-navigation/native";
import { useTask } from "../../hooks/useTask";
import { GestureHandlerRootView } from "react-native-gesture-handler"; // Importe GestureHandlerRootView
import { deserializeTask } from "../../functions/task";

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
  } = useTask(deserializeTask(route.params.task));

  //Pour l'ajout de nouvelles sous taches
  const [newSubTaskName, setNewSubTaskName] = useState("");

  //Utilisation du contexte pour selectioner la catégorie de la tache
  const { categories } = useCategoryContext();

  //Utilisation du contexte pour remplacer la tache
  const { replaceTask } = useTaskContext();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmChoosenDate = (date: Date) => {
    task.date = date;
    hideDatePicker();
  };

  const handleCategoryChoosen = (category: Category) => {
    setTaskCategory(category);
  };

  const onSavePress = () => {
    //Si jamais l'utilisateur n'a pas ajouté la tache avant de save
    if (newSubTaskName) {
      const newSubTask: Task = {
        name: newSubTaskName,
        category: task.category,
        date: task.date,
        id: Date.now(),
        isComplete: false,
        subTasks: [],
        mainTaskId: task.id,
      };
      const updatedTask = { ...task, subTasks: [...task.subTasks, newSubTask] };
      replaceTask(updatedTask);
    } else {
      replaceTask(task);
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Pressable>
        <Button
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
          icon="close"
        ></Button>
      </Pressable>
      <View style={styles.body}>
        <View style={styles.top}>
          <TextInput
            value={task.name}
            onChangeText={(text) => setTaskName(text)}
            placeholder="Write a new task..."
            style={{ fontSize: 36 }}
          />
          <Row style={styles.subTask} gap={16}>
            <CheckBox checked={false} />
            <TextInput
              value={newSubTaskName}
              placeholder="Add subtask"
              onChangeText={(text) => setNewSubTaskName(text)}
              onBlur={() => {
                addSubTask(newSubTaskName);
                setNewSubTaskName("");
                console.log("NewSubTask reinit");
              }}
              style={{ fontSize: 17 }}
            />
          </Row>

          <GestureHandlerRootView>
            <FlatList
              data={task.subTasks}
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
        </View>

        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={60}>
          <View style={[styles.bottom]}>
            <FlatList
              ItemSeparatorComponent={() => <View style={{ width: 14 }} />}
              data={categories}
              renderItem={({ item }) => (
                <Pressable onPress={() => handleCategoryChoosen(item)}>
                  <CategoryLabel
                    category={item}
                    selected={task.category?.id === item.id}
                  />
                </Pressable>
              )}
              horizontal={true}
            />
            <Row gap={8}>
              <Button
                icon={"clockPlus"}
                style={styles.clockButton}
                onPress={() => {
                  showDatePicker();
                }}
              />
              <Button
                style={styles.plusButton}
                onPress={() => {
                  onSavePress();
                }}
                text={"Save"}
              />
            </Row>
          </View>
        </KeyboardAvoidingView>

        <DateTimePickerModal
          display="default"
          isVisible={isDatePickerVisible}
          mode="time"
          onConfirm={handleConfirmChoosenDate}
          onCancel={hideDatePicker}
        />
      </View>
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
  container: {
    flex: 1,
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
  subTask: {
    paddingLeft: 36,
  },
  clockButton: {
    width: 62,
    backgroundColor: "#EFEFEF",
  },
  plusButton: {
    flex: 1,
  },
  bottom: {
    paddingHorizontal: 22,
    paddingVertical: 10,
    rowGap: 20,
  },
  scrollContent: {
    flex: 1,
  },
});
