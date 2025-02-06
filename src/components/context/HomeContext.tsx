import { createContext, ReactNode, useContext } from "react";
import { Category } from "@types";
import { useCategoryManager } from "@hooks/useCategoryManager";
import { useHome } from "@hooks/useHome";

//Création du contexte
type HomeContextType = {
  view: "Calendar" | "Today";
  date: string;
  setDate: (date: string) => void;
  setView: (name: "Calendar" | "Today") => void;
};

export const HomeContext = createContext<HomeContextType>({
  view: "Calendar",
  date: "",
  setDate: () => {},
  setView: () => {},
});

type Props = {
  children: ReactNode;
};

//Installation du contexte
export default function HomeContextProvider({ children }: Props) {
  const { view, date, setDate, setView } = useHome();

  const valueHomeContext = {
    view,
    date,
    setDate,
    setView,
  };

  return (
    <HomeContext.Provider value={valueHomeContext}>
      {children}
    </HomeContext.Provider>
  );
}

//Consometion du contexte
export const useHomeContext = () => useContext(HomeContext);
