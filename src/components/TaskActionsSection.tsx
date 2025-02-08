import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { Row } from "@components/Row";
import { Button } from "@components/Button";
import { Category, Task } from "@types";
import { useTheme } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDatePicker } from "@hooks/useDatePicker";
import { CategorySelector } from "./CategorySelector";
import { TimeSelector } from "./TimeSelector";
import { Colors } from "@const/Colors";

type Props = {
  task: Task;
  setTaskCategory: (category: Category) => void;
  setTaskDate: (date: Date) => void;
  setTaskStartTime: (date: Date) => void;
  setTaskEndTime: (date: Date) => void;
  onSavePress: () => void;
};

export function TaskActionsSection({
  task,
  setTaskCategory,
  setTaskDate,
  setTaskStartTime,
  setTaskEndTime,
  onSavePress,
}: Props) {
  const { colors } = useTheme();

  const {
    handleConfirmDate,
    showDatePicker,
    hideDatePicker,
    isDatePickerVisible,
  } = useDatePicker(setTaskDate);

  return (
    <>
      <KeyboardAvoidingView behavior="position">
        <View
          style={[styles.container, { backgroundColor: colors.background }]}
        >
          <CategorySelector setTaskCategory={setTaskCategory} task={task} />
          <Row gap={8}>
            <Button
              icon={"clockPlus"}
              style={styles.clockButton}
              onPress={() => {
                showDatePicker();
              }}
            />

            <TimeSelector
              task={task}
              setTaskStartTime={setTaskStartTime}
              setTaskEndTime={setTaskEndTime}
            />
            <Button
              style={styles.plusButton}
              onPress={() => {
                onSavePress();
              }}
              text={"Save"}
              disabled={task.name ? false : true}
            />
          </Row>
        </View>
      </KeyboardAvoidingView>

      <DateTimePickerModal
        display="inline"
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
        date={task.date instanceof Date ? task.date : new Date()}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingVertical: 10,
    rowGap: 20,
  },
  clockButton: {
    width: 62,
    backgroundColor: Colors.lightGrey,
  },
  plusButton: {
    flex: 1,
  },
});
