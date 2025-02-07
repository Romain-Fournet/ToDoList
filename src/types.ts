import { Icons } from "./consts/Icons";

export type Task = {
  id: number;
  name: string;
  category: Category;
  isComplete: boolean;
  mainTaskId?: number;
  subTasks: Task[];
  //Obligé de mettre string pour la serialisation des dates
  date: Date | string;
  startTime: Date;
  endTime: Date;
};

export type Category = {
  id: number;
  name: string;
  illustration: keyof typeof Icons;
  color: string;
};

//For calendar view
export type TaskStyle = {
  task: Task;
  style: { width: number; height: number; top: number; left: number };
};
