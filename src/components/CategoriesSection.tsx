import { FlatList, StyleSheet, View } from "react-native";
import { CategoryCard } from "./CategoryCard";
import { getAssociatedTasks } from "src/functions/category";
import { useTaskContext } from "./context/TaskContext";
import { useCategoryContext } from "./context/CategoryContext";

export function CategoriesSection() {
  const { tasks } = useTaskContext();
  const { categories } = useCategoryContext();

  return (
    <View style={styles.categoriesWraper}>
      <FlatList
        data={categories}
        numColumns={2}
        columnWrapperStyle={styles.gridGap}
        contentContainerStyle={styles.gridGap}
        renderItem={({ item }) => (
          <CategoryCard
            key={item.id}
            category={item}
            numberTasksAssociated={getAssociatedTasks(item.id, tasks)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  categoriesWraper: {
    //Height of 2 CategoryCard
    maxHeight: 194,
  },
  gridGap: {
    gap: 8,
  },
});
