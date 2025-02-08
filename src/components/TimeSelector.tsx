import { useDatePicker } from "@hooks/useDatePicker";
import { Task } from "@types";
import { Pressable, StyleSheet, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ThemedText } from "./ThemedText";
import { formatTime } from "src/functions/date";

type StartTimeSelectorProps = {
  task: Task;
  setTaskStartTime: (date: Date) => void;
};

function StartTimeSelector({ task, setTaskStartTime }: StartTimeSelectorProps) {
  const {
    handleConfirmDate,
    showDatePicker,
    hideDatePicker,
    isDatePickerVisible,
  } = useDatePicker(setTaskStartTime);

  const time = task.startTime;
  return (
    <>
      <Pressable style={styles.card} onPress={showDatePicker}>
        <ThemedText variant="subtitle">{formatTime(time)}</ThemedText>
      </Pressable>
      <DateTimePickerModal
        display="spinner"
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
        date={task.startTime}
        minuteInterval={5}
      />
    </>
  );
}

type EndTimeSelectorProps = {
  task: Task;
  setTaskEndTime: (date: Date) => void;
};

function EndTimeSelector({ task, setTaskEndTime }: EndTimeSelectorProps) {
  const {
    handleConfirmDate,
    showDatePicker,
    hideDatePicker,
    isDatePickerVisible,
  } = useDatePicker(setTaskEndTime);

  const time = task.endTime;
  return (
    <>
      <Pressable style={styles.card} onPress={showDatePicker}>
        <ThemedText variant="subtitle">{formatTime(time)}</ThemedText>
      </Pressable>
      <DateTimePickerModal
        display="spinner"
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
        date={task.endTime}
        minuteInterval={5}
      />
    </>
  );
}

type TimeSelectorProps = {
  task: Task;
  setTaskStartTime: (date: Date) => void;
  setTaskEndTime: (date: Date) => void;
};

export function TimeSelector({
  task,
  setTaskStartTime,
  setTaskEndTime,
}: TimeSelectorProps) {
  return (
    <View style={styles.container}>
      <StartTimeSelector task={task} setTaskStartTime={setTaskStartTime} />
      <EndTimeSelector task={task} setTaskEndTime={setTaskEndTime} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: 10,
  },
  card: {
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 6,
    backgroundColor: "#dbdbdb",
  },
});
