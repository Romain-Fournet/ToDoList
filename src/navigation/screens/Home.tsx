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

export function Home() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { tasks, toggleTaskCompletion, deleteTask } = useTaskContext();

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
                            toggleTaskCompletion={toggleTaskCompletion}
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
