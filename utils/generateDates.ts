export function generateYearsArray() {
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let year = 1917; year <= currentYear; year++) {
    years.push(year);
  }

  return years.reverse();
}

export function generateMonths() {
  const total = 12;

  const months = [];
  for (let month = 1; month <= total; month++) {
    months.push(month);
  }

  return months;
}
export function generateTaYears() {
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let year = currentYear; year <= currentYear + 4; year++) {
    years.push(year);
  }

  return years;
}
