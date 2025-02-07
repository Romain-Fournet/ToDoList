import { useTaskContext } from "@components/context/TaskContext";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { DaysList } from "./DayList";
import { useEffect, useMemo, useRef, useState } from "react";
import { getDaysFromToday } from "src/functions/date";
import { TaskStyle } from "@types";
import { ThemedText } from "./ThemedText";
import { Row } from "./Row";
import { getTasksAndStyles } from "src/functions/task";
import { HoursBar } from "./HoursBar";
import { EventCard } from "./EventCard";

export function Calendar() {
  const { tasks } = useTaskContext();
  const [selectedDay, setSelectedDay] = useState(0);
  const [eventMaxWidth, setEventMaxWidth] = useState(0);
  const [tasksAndStyles, setTasksAndStyle] = useState<TaskStyle[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollTo({ y: 540, animated: true });
  }, [eventMaxWidth]);

  const taskForDay = useMemo(
    () =>
      tasks.filter(
        (task) =>
          getDaysFromToday(
            task.date instanceof Date ? task.date : new Date()
          ) === selectedDay
      ),
    [tasks, selectedDay]
  );

  useEffect(() => {
    getTasksAndStyles(taskForDay, eventMaxWidth, setTasksAndStyle);
  }, [tasks, selectedDay, eventMaxWidth]);

  const handleLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setEventMaxWidth(width - 56);
  };

  return (
    <View style={styles.container}>
      <DaysList selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      <ScrollView
        ref={scrollViewRef}
        onLayout={(event) => {
          handleLayout(event);
        }}
        style={{ flex: 1 }}
      >
        <HoursBar />
        {tasksAndStyles.map((taskAndStyle) => (
          <EventCard
            key={taskAndStyle.task.id}
            style={taskAndStyle.style}
            task={taskAndStyle.task}
          />
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
