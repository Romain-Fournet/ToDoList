import { useTaskContext } from "@components/context/TaskContext";
import { Task } from "../types";

export function serializeTask(task: Task) {
  const serializedTask = {
    ...task,
    date: task.date instanceof Date ? task.date?.toISOString() : "",
    subTasks: task.subTasks.map((subTask) => ({
      ...subTask,
      date: subTask.date instanceof Date ? subTask.date.toISOString() : "",
    })),
  };

  return serializedTask;
}

export function deserializeTask(serializedTask: any): Task {
  return {
    ...serializedTask,
    date: serializedTask.date ? new Date(serializedTask.date) : null,
    subTasks: serializedTask.subTasks.map((subTask: any) => ({
      ...subTask,
      date: subTask.date ? new Date(subTask.date) : null,
    })),
  };
}

export function countTaskAndSubTasks(tasks: Task[]): number {
  const taskCount = tasks.length;
  const subTaskCount = tasks.reduce((cpt, task) => {
    return cpt + (task.subTasks ? task.subTasks.length : 0);
  }, 0);
  return taskCount + subTaskCount;
}
