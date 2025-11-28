export function calculateDaysLate(dueDate: Date, returnDate?: Date): number {
  const comparisonDate = returnDate ?? new Date();

  if (comparisonDate <= dueDate) return 0;

  return getDaysBetween(comparisonDate, dueDate);
}

const getDaysBetween = (startDate: Date, endDate: Date) => {
  const millisecondsPerDay = 1000 * 60 * 60 * 24;

  const differenceInMs = startDate.getTime() - endDate.getTime();

  return Math.ceil(differenceInMs / millisecondsPerDay);
};
