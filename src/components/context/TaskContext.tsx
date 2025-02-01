import { createContext, ReactNode, useContext } from "react";
import { Task } from "../../types";
import { useTaskManager } from "../../hooks/useTasksManager";

//Création du contexte
type TaskContextType = {
  tasks: Task[];
  addTask: (newTask: Task) => void;
  replaceTask: (modifiedTask: Task) => void;
  deleteTask: (id: number) => void;
  toggleTaskCompletion: (id: number, subId?: number) => void;
  toggleSubTaskCompletion: (mainTaskId: number, subTaskId: number) => void;
};

export const TaskContext = createContext<TaskContextType>({
  tasks: [],
  addTask: () => {},
  replaceTask: () => {},
  deleteTask: () => {},
  toggleTaskCompletion: () => {},
  toggleSubTaskCompletion: () => {},
});

type Props = {
  children: ReactNode;
};

//Instalation du contexte
export default function TaskContextProvider({ children }: Props) {
  const {
    tasks,
    addTask,
    replaceTask,
    deleteTask,
    toggleTaskCompletion,
    toggleSubTaskCompletion,
  } = useTaskManager();

  const valueTaskContext = {
    tasks,
    addTask,
    replaceTask,
    deleteTask,
    toggleTaskCompletion,
    toggleSubTaskCompletion,
  };

  return (
    <TaskContext.Provider value={valueTaskContext}>
      {children}
    </TaskContext.Provider>
  );
}

//Consomation du contexte
export const useTaskContext = () => useContext(TaskContext);
