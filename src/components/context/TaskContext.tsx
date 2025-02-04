import { createContext, ReactNode, useContext } from "react";
import { Task } from "../../types";
import { useTaskManager } from "../../hooks/useTasksManager";

//Création du contexte
type TaskContextType = {
  tasks: Task[];
  totalTasks: number;
  updateTotalTasks: () => void;
  addTask: (newTask: Task) => void;
  replaceTask: (modifiedTask: Task) => void;
  deleteTask: (id: number) => void;
  toggleTaskCompletion: (id: number, subId?: number) => void;
  toggleSubTaskCompletion: (mainTaskId: number, subTaskId: number) => void;
};

export const TaskContext = createContext<TaskContextType>({
  tasks: [],
  totalTasks: 0,
  addTask: () => {},
  replaceTask: () => {},
  deleteTask: () => {},
  toggleTaskCompletion: () => {},
  toggleSubTaskCompletion: () => {},
  updateTotalTasks: () => {},
});

type Props = {
  children: ReactNode;
};

//Instalation du contexte
export default function TaskContextProvider({ children }: Props) {
  const {
    tasks,
    totalTasks,
    updateTotalTasks,
    addTask,
    replaceTask,
    deleteTask,
    toggleTaskCompletion,
    toggleSubTaskCompletion,
  } = useTaskManager();

  const valueTaskContext = {
    tasks,
    totalTasks,
    updateTotalTasks,
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
