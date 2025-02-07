import { useTaskContext } from "@components/context/TaskContext";
import { Task, TaskStyle } from "../types";
import { useEffect, useState } from "react";

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

export function getTasksAndStyles(
  tasks: Task[],
  eventMaxWidth: number,
  setTasksAndStyles: (tasksAndStyles: TaskStyle[]) => void
) {
  const calculatedStyles: TaskStyle[] = [];

  // Calcul du nombre de tâches qui se chevauchent à un moment donné
  for (let i = 0; i < tasks.length; i++) {
    const iTask = tasks[i];
    let cptSameTimeTasks = 1; // On commence avec 1, pour la tâche elle-même
    let cptSameTimeTaskBefore = 0;

    for (let j = 0; j < tasks.length; j++) {
      if (i !== j) {
        const jTask = tasks[j];
        const iStartMinutes =
          iTask.startTime.getHours() * 60 + iTask.startTime.getMinutes();
        const iEndMinutes =
          iTask.endTime.getHours() * 60 + iTask.endTime.getMinutes();
        const jStartMinutes =
          jTask.startTime.getHours() * 60 + jTask.startTime.getMinutes();
        const jEndMinutes =
          jTask.endTime.getHours() * 60 + jTask.endTime.getMinutes();

        // Vérifie si les deux tâches se chevauchent
        if (
          (jStartMinutes >= iStartMinutes && jStartMinutes < iEndMinutes) ||
          (jEndMinutes > iStartMinutes && jEndMinutes <= iEndMinutes) ||
          (jStartMinutes <= iStartMinutes && jEndMinutes >= iEndMinutes)
        ) {
          cptSameTimeTasks += 1; // Incrémente si les tâches se chevauchent
          if (j < i) {
            cptSameTimeTaskBefore += 1;
          }
        }
      }
    }

    // Calcul des styles (largeur, hauteur, position top)
    const start =
      iTask.startTime.getMinutes() + iTask.startTime.getHours() * 60;
    const end = iTask.endTime.getMinutes() + iTask.endTime.getHours() * 60;
    const minutedDuration = end - start;
    const height = minutedDuration * 1.5;
    const top = start * 1.5;

    console.log(iTask.name);
    console.log(
      `width: ${
        eventMaxWidth / cptSameTimeTasks
      }  height : ${height} top: ${top}
        before: ${cptSameTimeTaskBefore}`
    );
    // Enregistre le style calculé
    calculatedStyles.push({
      task: iTask,
      style: {
        width: eventMaxWidth / cptSameTimeTasks,
        height: height,
        top: top,
        left: (eventMaxWidth / cptSameTimeTasks) * cptSameTimeTaskBefore + 56,
      },
    });
  }

  // Met à jour l'état avec les styles calculés
  setTasksAndStyles(calculatedStyles);
}
