import { useTaskContext } from "@components/context/TaskContext";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { DaysList } from "./DayList";
import { useRef, useState } from "react";
import { formatTime, getDaysFromToday } from "src/functions/date";
import { FlatList } from "react-native-gesture-handler";
import { Task } from "@types";
import { ThemedText } from "./ThemedText";
import { Row } from "./Row";

export function Calendar() {
  const { tasks } = useTaskContext();
  const [selectedDay, setSelectedDay] = useState(0);

  const [eventMaxWidth, setEventMaxWidth] = useState(0);

  const hours = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, "0")}:00`
  );

  const taskForDay = tasks.filter(
    (task) =>
      getDaysFromToday(task.date instanceof Date ? task.date : new Date()) ===
      selectedDay
  );

  const getTaskStyle = (task: Task) => {
    const start = task.startTime.getMinutes() + task.startTime.getHours() * 60;
    const end = task.endTime.getMinutes() + task.endTime.getHours() * 60;
    const minutedDuration = end - start;
    const height = minutedDuration * 1.5;
    const top = start * 1.5;
    console.log(task.startTime);
    console.log(top, height);
    return { top: top, height: height };
  };

  return (
    <View style={styles.container}>
      <DaysList selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      <ScrollView
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
        {taskForDay.map((task) => (
          <View
            style={[
              getTaskStyle(task),
              {
                position: "absolute",
                left: 56,
                width: eventMaxWidth,
                borderRadius: 8,
                padding: 16,
              },
            ]}
          >
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: task.category.color,
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
                  backgroundColor: task.category.color,
                }}
              />
              <ThemedText textStyle="normal" variant="body">
                {task.name}
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
