export const getTodayDate = () => {
  const today = new Date();

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
  };

  const todayFormat = today
    .toLocaleDateString("fr-FR", options)
    .replace(".", "");

  return todayFormat;
};

export const getDateMonth = (nbDaysFromToday: number) => {
  const day = new Date();
  day.setDate(day.getDate() + nbDaysFromToday);

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
  };

  const formatDay = day.toLocaleDateString("fr-FR", options).replace(".", "");

  return formatDay;
};

export const getDateWeekday = (nbDaysFromToday: number) => {
  const day = new Date();
  day.setDate(day.getDate() + nbDaysFromToday);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
  };

  const dayFormat = day.toLocaleDateString("fr-FR", options).replace(".", "");

  return dayFormat;
};

export const getNextDates = (startDate: Date): Date[] => {
  const dates: Date[] = [];

  for (let i = 1; i < 31; i++) {
    const nextDate = new Date(startDate);
    nextDate.setDate(startDate.getDate() + i);
    dates.push(nextDate);
  }

  return dates;
};

export function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}
