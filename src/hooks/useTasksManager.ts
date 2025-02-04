import { Category, Task } from "../types";
import { useContext, useState } from "react";
import { CategoryContext } from "@components/context/CategoryContext";

export function useTaskManager() {
  const { categories } = useContext(CategoryContext);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      name: "Go for a run",
      category: categories[0],
      isComplete: false,
      subTasks: [],
      date: new Date(),
    },
    {
      id: 2,
      name: "Finish project report",
      category: categories[0],
      isComplete: true,
      subTasks: [],
      date: new Date(),
    },
    {
      id: 3,
      name: "Meditate for 15 minutes",
      category: categories[0],
      isComplete: false,
      subTasks: [],
      date: new Date(),
    },
    {
      id: 4,
      name: "Organize documents",
      category: categories[0],
      isComplete: false,
      subTasks: [],
      date: new Date(),
    },
    {
      id: 5,
      name: "Drink more water",
      category: categories[0],
      isComplete: true,
      subTasks: [
        {
          id: 1,
          name: "Drink",
          category: categories[0],
          isComplete: true,
          mainTaskId: 5,
          subTasks: [],
          date: new Date(),
        },
      ],
      date: new Date(),
    },
  ]);

  const addSubTask = (task: Task, subTaskName: string) => {
    const newSubTask: Task = {
      id: Date.now(),
      name: subTaskName,
      category: task.category,
      isComplete: false,
      mainTaskId: task.id,
      subTasks: [],
      date: task.date,
    };
    task.subTasks = [...task.subTasks, newSubTask];
  };

  const addTask = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          const isComplete = !task.isComplete;
          if (isComplete) {
            return {
              ...task,
              isComplete: isComplete,
              subTasks: task.subTasks.map((subTask) => ({
                ...subTask,
                isComplete: true,
              })),
            };
          }
          return { ...task, isComplete: isComplete };
        }
        return task;
      })
    );
  };

  const toggleSubTaskCompletion = (mainTaskId: number, subTaskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === mainTaskId) {
          const updatedSubTasks = task.subTasks.map((subTask) => {
            return subTask.id === subTaskId
              ? { ...subTask, isComplete: !subTask.isComplete }
              : subTask;
          });

          const isMainTaskCompleted = updatedSubTasks.every(
            (subTask) => subTask.isComplete
          );

          return {
            ...task,
            isComplete: isMainTaskCompleted,
            subTasks: updatedSubTasks,
          };
        }
        return task;
      })
    );
  };

  const replaceTask = (modifiedTask: Task) => {
    setTasks((prevtasks) =>
      prevtasks.map((task) =>
        task.id === modifiedTask.id ? modifiedTask : task
      )
    );
  };

  return {
    tasks,
    addTask,
    deleteTask,
    toggleTaskCompletion,
    toggleSubTaskCompletion,
    replaceTask,
  };
}
