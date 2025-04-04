import { Category } from "@types";
import { Image, StyleSheet, View, ViewProps } from "react-native";
import { Row } from "@components/Row";
import { ThemedText } from "@components/ThemedText";
import { Icons } from "@const/Icons";
import { Colors } from "@const/Colors";

type Props = ViewProps & {
  category: Category;
  numberTasksAssociated: number;
};

export function CategoryCard({
  category,
  numberTasksAssociated,
  style,
}: Props) {
  return (
    <View style={styles.wraper}>
      <View
        style={[styles.background, { backgroundColor: category.color }]}
      ></View>
      <View style={styles.body}>
        <Image
          style={styles.illustration}
          source={Icons[category.illustration]}
          width={24}
          height={24}
        ></Image>
        <Row>
          <ThemedText variant="body" style={{ fontWeight: "bold" }}>
            {numberTasksAssociated + " "}
          </ThemedText>
          <ThemedText
            variant="body"
            style={{ fontWeight: "medium", color: Colors.grey }}
          >
            {category.name}
          </ThemedText>
        </Row>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wraper: {
    flex: 1 / 2,
    borderRadius: 12,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.1,
    borderRadius: 12,
  },
  body: {
    zIndex: 1,
    padding: 16,
    rowGap: 16,
  },
  illustration: {
    zIndex: 1,
  },
});
