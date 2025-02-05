import { useTaskContext } from "@components/context/TaskContext";
import { Text } from "react-native";

export function Calendar() {
  const { tasks } = useTaskContext();

  return (
    <>
      <Text>CALENDAR</Text>
    </>
  );
}
