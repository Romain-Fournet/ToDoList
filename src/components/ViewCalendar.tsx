import { useTaskContext } from "@components/context/TaskContext";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { DaysList } from "./DayList";
import { useEffect, useRef, useState } from "react";
import { getDaysFromToday } from "src/functions/date";
import { TaskStyle } from "@types";
import { ThemedText } from "./ThemedText";
import { Row } from "./Row";
import { getTasksStyle } from "src/functions/task";

export function Calendar() {
  const { tasks } = useTaskContext();
  const [selectedDay, setSelectedDay] = useState(0);

  const [eventMaxWidth, setEventMaxWidth] = useState(0);
  const [tasksAndStyles, setTasksAndStyle] = useState<TaskStyle[]>([]);

  const scrollViewRef = useRef<ScrollView>(null);
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 540, animated: true });
    }
  }, [eventMaxWidth]);

  useEffect(() => {
    console.log("Effect");
    getTasksStyle(taskForDay, eventMaxWidth, setTasksAndStyle);
  }, [tasks, selectedDay, eventMaxWidth]);

  const hours = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, "0")}:00`
  );

  const taskForDay = tasks.filter(
    (task) =>
      getDaysFromToday(task.date instanceof Date ? task.date : new Date()) ===
      selectedDay
  );

  return (
    <View style={styles.container}>
      <DaysList selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      <ScrollView
        ref={scrollViewRef}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          setEventMaxWidth(width - 56);
        }}
        style={{ flex: 1 }}
      >
        {hours.map((hour) => (
          <View key={hour.toString()} style={{ height: 90, width: 56 }}>
            <Text>{hour.toString()}</Text>
          </View>
        ))}
        {tasksAndStyles &&
          tasksAndStyles.map((taskAndStyle) => (
            <View
              key={taskAndStyle.task.id}
              style={[
                taskAndStyle.style,
                {
                  position: "absolute",
                  borderRadius: 8,
                  padding: 16,
                },
              ]}
            >
              <View
                style={{
                  ...StyleSheet.absoluteFillObject,
                  backgroundColor: taskAndStyle.task.category.color,
                  borderRadius: 8,
                  opacity: 0.1,
                }}
              />
              <Row gap={8}>
                <View
                  style={{
                    height: 16,
                    width: 16,
                    borderRadius: 8,
                    backgroundColor: taskAndStyle.task.category.color,
                  }}
                />
                <ThemedText textStyle="normal" variant="body">
                  {taskAndStyle.task.name}
                </ThemedText>
              </Row>
            </View>
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: 32,
    flex: 1,
  },
});
