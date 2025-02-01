import { Row } from "@components/Row";
import { CheckBox } from "@components/CheckBox";
import { TextInput, StyleSheet } from "react-native";
import { useState } from "react";

type NewSubTaskInputProps = {
  addSubTask: (name: string) => void;
};

export function NewSubTaskInput({ addSubTask }: NewSubTaskInputProps) {
  const [newSubTaskName, setNewSubTaskName] = useState("");
  const handleBlur = () => {
    if (newSubTaskName) {
      addSubTask(newSubTaskName);
      setNewSubTaskName("");
    }
  };
  return (
    <Row style={styles.subTask} gap={16}>
      <CheckBox checked={false} />
      <TextInput
        value={newSubTaskName}
        placeholder="Add subtask"
        onChangeText={(text) => setNewSubTaskName(text)}
        onBlur={() => handleBlur()}
        style={{ fontSize: 17 }}
      />
    </Row>
  );
}

const styles = StyleSheet.create({
  subTask: {
    paddingLeft: 36,
  },
});
