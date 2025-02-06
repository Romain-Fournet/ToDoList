import { useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { DateCard } from "./DateCard";

export function DaysList() {
  const [days, setDays] = useState<number[]>([...Array(31).keys()]);
  const [selectedDay, setSelectedDay] = useState(0);

  const getMoreDays = () => {
    const lastDay = days[days.length - 1];
    const nextDays = Array.from({ length: 31 }, (_, i) => lastDay + i + 1);
    setDays((prev) => [...prev, ...nextDays]);
  };

  return (
    <FlatList
      data={days}
      renderItem={({ item }) => (
        <DateCard
          nbDaysFromToday={item}
          isSelected={item === selectedDay}
          setSelectedDay={setSelectedDay}
        />
      )}
      onEndReached={getMoreDays}
      onEndReachedThreshold={0.1}
      horizontal={true}
      keyExtractor={(item) => item.toString()}
      contentContainerStyle={{ gap: 12 }}
    />
  );
}
