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

export const getFutureDate = (nbDaysFromToday: number) => {
  const day = new Date();
  day.setDate(day.getDate() + nbDaysFromToday);

  return day;
};

export const getDateMonthFormat = (date: Date) => {
  if (date instanceof Date) {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
    };

    const formatDay = date
      .toLocaleDateString("fr-FR", options)
      .replace(".", "");

    return formatDay;
  } else console.log(date);
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

export const getDaysFromToday = (date: Date) => {
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  const differenceInMilliseconds = date.getTime() - today.getTime();
  const differenceInDays = Math.round(
    differenceInMilliseconds / (1000 * 60 * 60 * 24)
  );

  return differenceInDays;
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
