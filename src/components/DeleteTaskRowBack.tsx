import { useTheme } from "@react-navigation/native";
import { Pressable, View, Text, StyleSheet } from "react-native";

type Props = {
  deleteTask: (id: number) => void;
  taskId: number;
};

export function DeleteTaskRowBack({ deleteTask, taskId }: Props) {
  const { colors } = useTheme();

  return (
    <View style={styles.rowBack}>
      <View style={{ backgroundColor: colors.background }}></View>
      <Pressable style={styles.rowBackRight} onPress={() => deleteTask(taskId)}>
        <View>
          <Text style={{ color: "white" }}>Delete</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  rowBack: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    zIndex: -1,
  },
  rowBackRight: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: 112,
    backgroundColor: "#FF2B4E",
    alignItems: "center",
    justifyContent: "center",
  },
});
