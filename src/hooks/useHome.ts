import { useState, useEffect } from "react";
import { getTodayDate } from "src/functions/date";

export function useHome() {
  const [view, setView] = useState<"Calendar" | "Today">("Today");
  const [date, setDate] = useState(getTodayDate());

  return { view, setView, date, setDate };
}
