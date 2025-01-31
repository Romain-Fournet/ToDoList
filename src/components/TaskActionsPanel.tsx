import {
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { CategoryLabel } from "@components/CategoryLabel";
import { Row } from "@components/Row";
import { Button } from "@components/Button";
import { Category, Task } from "@types";
import { useTheme } from "@react-navigation/native";
import { useCategoryContext } from "@context/CategoryContext";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useState } from "react";
import { useDatePicker } from "@hooks/useDatePicker";

type TaskActionsPanelProps = {
  task: Task;
  setTaskCategory: (category: Category) => void;
  setTaskDate: (date: Date) => void;
  onSavePress: () => void;
};

export function TaskActionsPanel({
  task,
  setTaskCategory,
  setTaskDate,
  onSavePress,
}: TaskActionsPanelProps) {
  const { colors } = useTheme();
  const { categories } = useCategoryContext();

  const handleCategorySelection = (category: Category) => {
    setTaskCategory(category);
  };

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
          <FlatList
            ItemSeparatorComponent={() => <View style={{ width: 14 }} />}
            data={categories}
            renderItem={({ item }) => (
              <Pressable onPress={() => handleCategorySelection(item)}>
                <CategoryLabel
                  category={item}
                  selected={task.category.id === item.id}
                />
              </Pressable>
            )}
            horizontal={true}
          />
          <Row gap={8}>
            <Button
              icon={"clockPlus"}
              style={styles.clockButton}
              onPress={() => {
                showDatePicker();
              }}
            />
            <Button
              style={styles.plusButton}
              onPress={() => {
                onSavePress();
              }}
              text={"Save"}
            />
          </Row>
        </View>
      </KeyboardAvoidingView>

      <DateTimePickerModal
        display="inline"
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
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
    backgroundColor: "#EFEFEF",
  },
  plusButton: {
    flex: 1,
  },
});
