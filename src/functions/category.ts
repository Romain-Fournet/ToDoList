import { Category, Task } from "../types";

export function getAssociatedTasks(idCategory: number, tasks: Task[]): number {
  return tasks.reduce(
    (acc, task) => (task.category.id == idCategory ? acc + 1 : acc),
    0
  );
}
