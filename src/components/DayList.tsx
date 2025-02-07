import { useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { DateCard } from "./DateCard";
import { View } from "react-native";

type Props = {
  selectedDay: number;
  setSelectedDay: (day: number) => void;
};

export function DaysList({ selectedDay, setSelectedDay }: Props) {
  const [days, setDays] = useState<number[]>([...Array(31).keys()]);

  const getMoreDays = () => {
    const lastDay = days[days.length - 1];
    const nextDays = Array.from({ length: 31 }, (_, i) => lastDay + i + 1);
    setDays((prev) => [...prev, ...nextDays]);
  };

  return (
    <View>
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
    </View>
  );
}
