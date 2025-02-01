import { useCallback, useState } from "react";
import { Category, Task } from "../types";
import { useCategoryContext } from "@components/context/CategoryContext";

export function useTask(initialTask?: Task) {
  const { categories } = useCategoryContext();

  //Logique tache principale
  const emptyTask = {
    id: Date.now(),
    name: "",
    category: categories[0],
    isComplete: false,
    subTasks: [],
    date: new Date(),
  };

  const [task, setTask] = useState(initialTask ? initialTask : emptyTask);

  const setTaskName = (name: string) => {
    setTask((task) => ({ ...task, name }));
  };

  const setTaskCategory = (category: Category) => {
    setTask((task) => ({ ...task, category }));
  };

  const setTaskDate = (date: Date) => {
    setTask((task) => ({ ...task, date }));
  };

  //Logique sous taches

  const addSubTask = (name: string, addTask?: (task: Task) => void) => {
    const newSubTask: Task = {
      id: Date.now(),
      name: name,
      category: task.category,
      isComplete: false,
      mainTaskId: task.id,
      subTasks: [],
      date: task.date,
    };

    setTask((prevTask) => {
      const updatedTask = {
        ...prevTask,
        subTasks: [newSubTask, ...prevTask.subTasks],
      };
      if (addTask) {
        addTask(updatedTask);
      }
      return updatedTask;
    });
  };

  const deleteSubTask = (id: number) => {
    setTask((prevTask) => ({
      ...prevTask,
      subTasks: [...prevTask.subTasks.filter((subTask) => subTask.id !== id)],
    }));
  };

  const setSubTaskName = (id: number, name: string) => {
    setTask((prevTask) => ({
      ...prevTask,
      subTasks: [
        ...prevTask.subTasks.map((subTask) =>
          subTask.id === id ? { ...subTask, name: name } : subTask
        ),
      ],
    }));
  };

  return {
    task,
    setTaskName,
    setTaskCategory,
    setTaskDate,
    addSubTask,
    deleteSubTask,
    setSubTaskName,
  };
}
