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
