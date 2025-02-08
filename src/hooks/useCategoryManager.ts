import { Icons } from "../consts/Icons";
import { Category } from "../types";
import { useState } from "react";

export function useCategoryManager() {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 0,
      name: "Others",
      illustration: "folder",
      color: "#565250",
    },
    {
      id: 1,
      name: "Health",
      illustration: "heart",
      color: "#7990F8",
    },
    {
      id: 2,
      name: "Work",
      illustration: "tablet",
      color: "#46CF8B",
    },
    {
      id: 3,
      name: "Mental Health",
      illustration: "heartHand",
      color: "#BC5EAD",
    },
  ]);

  const addCategory = (name: string) => {
    const newCategory = {
      id: Date.now(),
      name: name,
      illustration: Icons.folder,
      color: "#46CF8B",
    };
    setCategories((previousCategories) => [...previousCategories, newCategory]);
  };

  //On doit toujours avoir au moins une categorie
  const deleteCategory = (id: number) => {
    setCategories((previousCategories) =>
      previousCategories.filter((category) => category.id !== id)
    );
  };

  return {
    categories,
    addCategory,
    deleteCategory,
  };
}
