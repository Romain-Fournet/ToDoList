export const getTodayDate = () => {
    const today = new Date();

    const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "short",
    };

    const todayFormat = today
        .toLocaleDateString("fr-FR", options)
        .replace(".", "");

    return(todayFormat)
}