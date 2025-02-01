import { Button } from "@components/Button";
import { CategoryCard } from "@components/CategoryCard";
import { useCategoryContext } from "@components/context/CategoryContext";
import { SubTaskCard } from "@components/SubTaskCard";
import { TaskCard } from "@components/TaskCard";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useTheme } from "@react-navigation/core";
import { useTaskContext } from "@components/context/TaskContext";
import { getAssociatedTasks } from "../../functions/category";
import { SwipeListView, SwipeRow } from "react-native-swipe-list-view";
import { serializeTask } from "../../functions/task";
import { HeaderDate } from "@components/HeaderDate";
import { CategoriesSection } from "@components/CategoriesSection";
import { TasksList } from "@components/TasksList";

export function Home() {
  const navigation = useNavigation();
  const { tasks, toggleTaskCompletion, deleteTask, toggleSubTaskCompletion } =
    useTaskContext();

  const screenHeight = Dimensions.get("window").height;
  const [bodyHeight, setBodyHeight] = useState(screenHeight - 86);

  useEffect(() => {
    setBodyHeight(screenHeight - 86);
  }, [screenHeight]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.body}>
        <HeaderDate beforeText="Today" />
        <CategoriesSection />
        <View style={{ maxHeight: bodyHeight - 390 }}>
          <TasksList
            tasks={tasks}
            deleteTask={deleteTask}
            toggleSubTaskCompletion={toggleSubTaskCompletion}
            toggleTaskCompletion={toggleTaskCompletion}
          />
        </View>
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
    marginHorizontal: 22,
    rowGap: 32,
    overflow: "hidden",
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 60,
  },
});
