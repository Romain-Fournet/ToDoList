import { Button } from "@components/Button";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/core";
import { useTaskContext } from "@components/context/TaskContext";
import { HeaderDate } from "@components/HeaderDate";
import { CategoriesSection } from "@components/CategoriesSection";
import { TasksList } from "@components/TasksList";
import { useAppContext } from "@components/context/AppContext";
import { Calendar } from "../../components/ViewCalendar";
import { ViewToday } from "@components/ViewToday";

export function Home() {
  const { view } = useAppContext();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.body}>
        <HeaderDate />
        {view === "Calendar" && <Calendar />}
        {view === "Today" && <ViewToday />}
      </View>
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
