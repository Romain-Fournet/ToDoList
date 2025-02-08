import { ButtonIcons } from "@const/ButtonIcons";
import { Pressable, Image, StyleSheet, ViewProps } from "react-native";
import { ThemedText } from "@components/ThemedText";
import { Colors } from "@const/Colors";

type Props = ViewProps & {
  icon?: keyof typeof ButtonIcons;
  text?: string;
  disabled?: boolean;
  onPress: () => void;
};

export function Button({ onPress, icon, text, style, disabled }: Props) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[styles.body, style]}
    >
      {icon && (
        <Image
          source={ButtonIcons[icon].image}
          style={ButtonIcons[icon].style}
        ></Image>
      )}
      {text && (
        <ThemedText variant="body" style={styles.text}>
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
    backgroundColor: Colors.lightBlack,
    borderRadius: 12,
    height: 60,
  },
  text: { color: Colors.white },
});
