import { Task } from "@types";
import { TextInput } from "react-native";

type Props = {
  task: Task;
  setName: (text: string) => void;
};

export function TaskName({ task, setName }: Props) {
  return (
    <TextInput
      value={task.name}
      onChangeText={(text) => setName(text)}
      placeholder="Write a new task..."
      style={{ fontSize: 36 }}
    />
  );
}
