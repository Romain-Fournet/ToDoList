import { createContext, ReactNode, useContext } from "react";
import { Category } from "../../types";
import { useCategoryManager } from "../../hooks/useCategoryManager";


//Création du contexte
type CategoryContextType = {
  categories: Category[];
  addCategory: (name: string) => void;
  deleteCategory: (id: number) => void;
};

export const CategoryContext = createContext<CategoryContextType>({
  categories: [],
  addCategory: () => {},
  deleteCategory: () => {},
});


type Props = {
  children: ReactNode
}

//Installation du contexte
export default function CategoryContextProvider({children}: Props){
  const { categories, addCategory, deleteCategory} = useCategoryManager()

  const valueCategoryContext = {
    categories, 
    addCategory,
    deleteCategory
  }

  return(
    <CategoryContext.Provider value={valueCategoryContext}>
      {children}
    </CategoryContext.Provider>
  )
}

//Consometion du contexte
export const useCategoryContext = () => useContext(CategoryContext)