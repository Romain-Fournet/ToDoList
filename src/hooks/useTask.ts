import { useCallback, useState } from "react";
import { Category, Task } from "../types";
import { useCategoryContext } from "@components/context/CategoryContext";
import { useTaskContext } from "@components/context/TaskContext";
import { formatTime } from "src/functions/date";
import { showAlert } from "src/functions/alert";

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
    startTime: new Date(),
    endTime: new Date(new Date().getTime() + 60 * 60 * 1000),
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
    if (date < task.endTime) {
      setTask((task) => ({ ...task, startTime: date }));
    } else {
      showAlert("Invalid start time", "The task cannot start after it ends.");
    }
  };

  const setTaskEndTime = (date: Date) => {
    if (date > task.startTime) {
      setTask((task) => ({ ...task, endTime: date }));
    } else {
      showAlert("Invalid end time", "The task cannot end before it start.");
    }
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
      startTime: new Date(),
      endTime: new Date(new Date().getTime() + 60 * 60 * 1000),
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
