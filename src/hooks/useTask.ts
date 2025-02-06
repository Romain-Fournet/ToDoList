import { useCallback, useState } from "react";
import { Category, Task } from "../types";
import { useCategoryContext } from "@components/context/CategoryContext";
import { useTaskContext } from "@components/context/TaskContext";
import { formatTime } from "src/functions/date";

export function useTask(initialTask?: Task) {
  const { categories } = useCategoryContext();
  const { updateTotalTasks } = useTaskContext();

  //Logique tache principale
  const emptyTask = {
    id: Date.now(),
    name: "",
    category: categories[0],
    isComplete: false,
    subTasks: [],
    date: new Date(),
    startTime: formatTime(new Date()),
    endTime: formatTime(new Date(new Date().getTime() + 60 * 60 * 1000)),
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

  const setTaskStartTime = (date: Date) => {
    const formatedTime = formatTime(date);
    setTask((task) => ({ ...task, startTime: formatedTime }));
  };

  const setTaskEndTime = (date: Date) => {
    const formatedTime = formatTime(date);
    setTask((task) => ({ ...task, endTime: formatedTime }));
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
      startTime: formatTime(new Date()),
      endTime: formatTime(new Date(new Date().getTime() + 60 * 60 * 1000)),
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
    updateTotalTasks();
  };

  const deleteSubTask = (id: number) => {
    setTask((prevTask) => ({
      ...prevTask,
      subTasks: [...prevTask.subTasks.filter((subTask) => subTask.id !== id)],
    }));
    updateTotalTasks();
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
    setTaskStartTime,
    setTaskEndTime,
    setTaskName,
    setTaskCategory,
    setTaskDate,
    addSubTask,
    deleteSubTask,
    setSubTaskName,
  };
}
