import { View, Image, StyleSheet } from "react-native";

type Props = { checked: boolean };

export function CheckBox({ checked }: Props) {
  return (
    <View style={styles.box}>
      {checked && (
        <View style={styles.innerBox}>
          <Image
            source={require("../assets/images/checked.png")}
            width={24}
            height={24}
          ></Image>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderRadius: 6,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#D6D6D6",
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  innerBox: {
    alignItems: "center",
    justifyContent: "center",
    width: 24,
    height: 24,
    backgroundColor: "#000000",
    borderRadius: 6,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#D6D6D6",
  },
});
