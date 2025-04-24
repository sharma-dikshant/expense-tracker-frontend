import { normalize } from "./dateUtils";

export const getSelectedExpenseIndex = (expenses, selected) => {
  const expenseDates = (expenses ?? []).map((el) => new Date(el.date));
  const selectedIndex = selected
    ? expenseDates.findIndex(
        (date) => normalize(date).getTime() === normalize(selected).getTime()
      )
    : -1;

  return selectedIndex;
};
