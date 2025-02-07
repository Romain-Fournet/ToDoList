import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderDate } from "@components/HeaderDate";
import { Calendar } from "../../components/ViewCalendar";
import { ViewToday } from "@components/ViewToday";
import { useHomeContext } from "@components/context/HomeContext";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";

export function Home() {
  const { view } = useHomeContext();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.body}>
        <HeaderDate />
        {view === "Calendar" && <Calendar />}
        {view === "Today" && <ViewToday />}
      </View>
      <Button
        style={styles.addButton}
        onPress={() => navigation.navigate("AddTask")}
        icon="plus"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    marginHorizontal: 22,
    rowGap: 32,
    marginBottom: 70,
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 60,
  },
});
