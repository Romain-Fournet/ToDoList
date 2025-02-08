import { createContext, ReactNode, useContext, useState } from "react";
import { Category } from "@types";
import { useCategoryManager } from "@hooks/useCategoryManager";
import { getTodayDate } from "src/functions/date";

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
  const [view, setView] = useState<"Calendar" | "Today">("Today");
  const [date, setDate] = useState(getTodayDate());

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
