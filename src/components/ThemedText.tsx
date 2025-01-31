import { TextStyle } from "../consts/TextStyle";
import { useTextStyles } from "../hooks/useTextStyles";
import { Text, TextProps } from "react-native";

type Props = TextProps & {
  textStyle: keyof (typeof TextStyle)["light"];
  variant: keyof typeof styles;
};

export function ThemedText({ textStyle, variant, style, ...rest }: Props) {
  const textStyles = useTextStyles();
  return (
    <Text
      style={[styles[variant] ?? styles.body, textStyles[textStyle], style]}
      {...rest}
    />
  );
}

const styles = {
  heading: {
    fontSize: 36,
    lineHeight: 44,
  },
  body: {
    fontSize: 17,
    lineHeight: 21,
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 15,
  },
};
