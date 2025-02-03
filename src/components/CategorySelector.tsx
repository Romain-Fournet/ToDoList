import { FlatList, Pressable, View } from "react-native";
import { CategoryLabel } from "./CategoryLabel";
import { useCategoryContext } from "./context/CategoryContext";
import { Category, Task } from "@types";

type Props = {
  setTaskCategory: (category: Category) => void;
  task: Task;
};

export function CategorySelector({ setTaskCategory, task }: Props) {
  const { categories } = useCategoryContext();

  const handleCategorySelection = (category: Category) => {
    setTaskCategory(category);
  };

  return (
    <FlatList
      ItemSeparatorComponent={() => <View style={{ width: 14 }} />}
      data={categories}
      renderItem={({ item }) => (
        <Pressable onPress={() => handleCategorySelection(item)}>
          <CategoryLabel
            category={item}
            selected={task.category.id === item.id}
          />
        </Pressable>
      )}
      horizontal={true}
    />
  );
}
