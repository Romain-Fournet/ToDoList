import { useState, useEffect } from "react";

export function useUserPreferences() {
  const [view, setView] = useState<"Calendar" | "Today">("Today");

  return { view, setView };
}
