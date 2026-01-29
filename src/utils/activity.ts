export const isDeadlineClosed = (deadline: string | null, endDate: string) => {
  const targetDate = deadline ?? endDate;
  return new Date(targetDate).getTime() < Date.now();
};
