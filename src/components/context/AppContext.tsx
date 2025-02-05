import { createContext, ReactNode, useContext } from "react";
import { Category } from "@types";
import { useCategoryManager } from "@hooks/useCategoryManager";
import { useUserPreferences } from "@hooks/useUserPreferences";

//Création du contexte
type AppContextType = {
  view: "Calendar" | "Today";
  setView: (name: "Calendar" | "Today") => void;
};

export const AppContext = createContext<AppContextType>({
  view: "Calendar",
  setView: () => {},
});

type Props = {
  children: ReactNode;
};

//Installation du contexte
export default function AppContextProvider({ children }: Props) {
  const { view, setView } = useUserPreferences();

  const valueAppContext = {
    view,
    setView,
  };

  return (
    <AppContext.Provider value={valueAppContext}>
      {children}
    </AppContext.Provider>
  );
}

//Consometion du contexte
export const useAppContext = () => useContext(AppContext);
