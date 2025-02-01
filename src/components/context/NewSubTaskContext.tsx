import { createContext, ReactNode, useContext, useState } from "react";
import { Task, Category } from "../../types";
import { useTaskManager } from "../../hooks/useTasksManager";
import { NewSubTaskInput } from "@components/NewSubTaskInput";

//Création du contexte
type NewSubTaskContextType = {
  newSubTaskName: string;
  setNewSubTaskName: (name: string) => void;
};

export const NewSubTaskContext = createContext<NewSubTaskContextType>({
  newSubTaskName: "",
  setNewSubTaskName: () => {},
});

type Props = {
  children: ReactNode;
};

//Instalation du contexte
export default function NewSubTaskContextProvider({ children }: Props) {
  const [newSubTaskName, setNewSubTaskName] = useState("");
  const valueNewSubTaskContext = {
    newSubTaskName,
    setNewSubTaskName,
  };

  return (
    <NewSubTaskContext.Provider value={valueNewSubTaskContext}>
      {children}
    </NewSubTaskContext.Provider>
  );
}

//Consomation du contexte
export const useNewSubTaskContext = () => useContext(NewSubTaskContext);
