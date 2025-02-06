import { useTaskContext } from "@components/context/TaskContext";
import { StyleSheet, Text, View } from "react-native";
import { DaysList } from "./DayList";

export function Calendar() {
  const { tasks } = useTaskContext();

  return (
    <View style={styles.container}>
      <DaysList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: 32,
  },
});
