import { Text, TextProps } from "react-native";

type Props = TextProps & {
  variant: keyof typeof styles;
};

export function ThemedText({ variant, style, ...rest }: Props) {
  return <Text style={[styles[variant] ?? styles.body, style]} {...rest} />;
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
