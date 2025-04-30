export const normalize = (date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const formatDate = (date) => {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export function getMonthName(month, year) {
  const day = 1;
  const date = new Date(year, month - 1, day);
  const monthName = date.toLocaleString("en-US", { month: "long" });
  return monthName;
}
