import { Task } from "../types";
import { useContext, useState } from "react";
import { CategoryContext } from "@components/context/CategoryContext";
import { countTaskAndSubTasks } from "src/functions/task";

export function useTaskManager() {
  const { categories } = useContext(CategoryContext);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      name: "Go for a run",
      category: categories[0],
      isComplete: false,
      subTasks: [],
      date: new Date("2025-02-07T00:00:00"),
      startTime: new Date("2025-02-09T07:00:00"),
      endTime: new Date("2025-02-09T08:00:00"),
    },
    {
      id: 2,
      name: "Finish project report",
      category: categories[0],
      isComplete: true,
      subTasks: [],
      date: new Date("2025-02-07T00:00:00"),
      startTime: new Date("2025-02-09T12:00:00"),
      endTime: new Date("2025-02-09T15:00:00"),
    },
    {
      id: 3,
      name: "Meditate for 15 minutes",
      category: categories[0],
      isComplete: false,
      subTasks: [],
      date: new Date("2025-02-08T00:00:00"),
      startTime: new Date("2025-02-09T16:00:00"),
      endTime: new Date("2025-02-09T17:00:00"),
    },
    {
      id: 4,
      name: "Organize documents",
      category: categories[0],
      isComplete: false,
      subTasks: [],
      date: new Date("2025-02-08T00:00:00"),
      startTime: new Date("2025-02-09T08:00:00"),
      endTime: new Date("2025-02-09T10:00:00"),
    },
    {
      id: 5,
      name: "Drink more water",
      category: categories[0],
      isComplete: true,
      date: new Date("2025-02-09T00:00:00"),
      startTime: new Date("2025-02-09T08:00:00"),
      endTime: new Date("2025-02-09T10:00:00"),
      subTasks: [
        {
          id: 1,
          name: "Drink",
          category: categories[0],
          isComplete: true,
          mainTaskId: 5,
          subTasks: [],
          date: new Date(),
          startTime: new Date(),
          endTime: new Date(new Date().getTime() + 60 * 60 * 1000),
        },
      ],
    },
  ]);

  const [totalTasks, setTotalTasks] = useState(countTaskAndSubTasks(tasks));

  const updateTotalTasks = () => {
    const totalTasks = countTaskAndSubTasks(tasks);
    setTotalTasks(totalTasks);
  };

  const addTask = (newTask: Task) => {
    updateTotalTasks();
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const deleteTask = (id: number) => {
    updateTotalTasks();
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
    totalTasks,
    updateTotalTasks,
    addTask,
    deleteTask,
    toggleTaskCompletion,
    toggleSubTaskCompletion,
    replaceTask,
  };
}
