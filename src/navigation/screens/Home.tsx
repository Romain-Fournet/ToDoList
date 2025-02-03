import { Button } from "@components/Button";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/core";
import { useTaskContext } from "@components/context/TaskContext";
import { HeaderDate } from "@components/HeaderDate";
import { CategoriesSection } from "@components/CategoriesSection";
import { TasksList } from "@components/TasksList";

export function Home() {
  const navigation = useNavigation();
  const { tasks, toggleTaskCompletion, deleteTask, toggleSubTaskCompletion } =
    useTaskContext();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.body}>
        <HeaderDate beforeText="Today" />
        <CategoriesSection />
        <TasksList
          tasks={tasks}
          deleteTask={deleteTask}
          toggleSubTaskCompletion={toggleSubTaskCompletion}
          toggleTaskCompletion={toggleTaskCompletion}
        />
      </View>

      <Button
        style={styles.addButton}
        onPress={() => navigation.navigate("AddTask")}
        icon="plus"
      ></Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    marginHorizontal: 22,
    rowGap: 32,
    marginBottom: 70,
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 60,
  },
});
