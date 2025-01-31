import { useState } from "react";

export function useDatePicker(onConfirm: (date: Date) => void) {
  const [isDatePickerVisible, setVisible] = useState(false);

  const showDatePicker = () => setVisible(true);
  const hideDatePicker = () => setVisible(false);

  const handleConfirmDate = (date: Date) => {
    onConfirm(date);
    hideDatePicker();
  };

  return {
    isDatePickerVisible,
    showDatePicker,
    hideDatePicker,
    handleConfirmDate,
  };
}
