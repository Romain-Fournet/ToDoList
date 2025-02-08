import { useTheme } from "@react-navigation/native";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { Row } from "./Row";
import { Colors } from "@const/Colors";

type Props = {
  deleteTask: (id: number) => void;
  taskId: number;
  rowHeight: number;
};

export function DeleteTaskRowBack({ deleteTask, taskId, rowHeight }: Props) {
  const { colors } = useTheme();

  return (
    <Row style={{ height: rowHeight }}>
      <View style={styles.rowBackLeft} />
      <Pressable onPress={() => deleteTask(taskId)}>
        <View style={[styles.rowBackRight]}>
          <Text style={{ color: "white" }}>Delete</Text>
        </View>
      </Pressable>
    </Row>
  );
}

const styles = StyleSheet.create({
  rowBackLeft: {
    flex: 1,
  },
  rowBackRight: {
    width: 112,
    backgroundColor: Colors.red,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});
