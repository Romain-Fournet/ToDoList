import { Pressable, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import {
  getDateMonthFormat,
  getDateWeekday,
  getFutureDate,
} from "src/functions/date";
import { useHomeContext } from "./context/HomeContext";
import { Colors } from "@const/Colors";
import { useEffect } from "react";

type Props = {
  nbDaysFromToday: number;
  isSelected: boolean;
  setSelectedDay: (index: number) => void;
};

export function DateCard({
  nbDaysFromToday,
  isSelected,
  setSelectedDay,
}: Props) {
  const [weekday, num] = getDateWeekday(nbDaysFromToday).split(" ");
  const { setDate, date } = useHomeContext();
  const backgroundColor = isSelected ? Colors.lightGrey : "none";

  const handleDateCardPressed = () => {
    const updatedDate = getFutureDate(nbDaysFromToday);
    setDate(updatedDate);
    setSelectedDay(nbDaysFromToday);
  };

  return (
    <Pressable
      onPress={handleDateCardPressed}
      style={[
        styles.container,
        { backgroundColor: backgroundColor, opacity: isSelected ? 1 : 0.3 },
      ]}
    >
      <ThemedText variant="subtitle">{weekday.toUpperCase()}</ThemedText>
      <ThemedText variant="body">{num}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    width: 60,
    height: 68,
    alignItems: "center",
    justifyContent: "center",
    rowGap: 6,
  },
});
