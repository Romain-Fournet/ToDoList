import { ButtonIcons } from "@const/ButtonIcons";
import { Pressable, Image, StyleSheet, ViewProps } from "react-native";
import { ThemedText } from "@components/ThemedText";

type Props = ViewProps & {
  icon?: keyof typeof ButtonIcons;
  text?: string;
  onPress: () => void;
};

export function Button({ onPress, icon, text, style }: Props) {
  return (
    <Pressable onPress={onPress} style={[styles.body, style]}>
      {icon && (
        <Image
          source={ButtonIcons[icon].image}
          style={ButtonIcons[icon].style}
        ></Image>
      )}
      {text && (
        <ThemedText
          variant="body"
          textStyle="normal"
          style={{ color: "#FFFFFF" }}
        >
          {text}
        </ThemedText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  body: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#393433",
    borderRadius: 12,
    height: 60,
  },
});
