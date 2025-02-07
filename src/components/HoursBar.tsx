import { Text, View } from "react-native";

export function HoursBar() {
  const hours = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, "0")}:00`
  );

  return hours.map((hour) => (
    <View key={hour.toString()} style={{ height: 90, width: 56 }}>
      <Text>{hour.toString()}</Text>
    </View>
  ));
}
