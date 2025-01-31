import { createContext, ReactNode, useContext } from "react";
import { Task, Category } from "../../types";
import { useTaskManager } from "../../hooks/useTasksManager";

//Création du contexte
type TaskContextType = {
  tasks: Task[];
  addTask: (newTask: Task) => void;
  replaceTask: (modifiedTask: Task) => void;
  deleteTask: (id: number) => void;
  toggleTaskCompletion: (id: number, subId?: number) => void;
};

export const TaskContext = createContext<TaskContextType>({
  tasks: [],
  addTask: () => {},
  replaceTask: () => {},
  deleteTask: () => {},
  toggleTaskCompletion: () => {},
});

type Props = {
  children: ReactNode;
};

//Instalation du contexte
export default function TaskContextProvider({ children }: Props) {
  const { tasks, addTask, replaceTask, deleteTask, toggleTaskCompletion } =
    useTaskManager();

  const valueTaskContext = {
    tasks,
    addTask,
    replaceTask,
    deleteTask,
    toggleTaskCompletion,
  };

  return (
    <TaskContext.Provider value={valueTaskContext}>
      {children}
    </TaskContext.Provider>
  );
}

//Consomation du contexte
export const useTaskContext = () => useContext(TaskContext);
