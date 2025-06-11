export const formatTimestamp = (timestamp?: number): string | undefined => {
  if (!timestamp) {
    return undefined
  } else {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }
}

export const getMonthDifferenceFromNow = (expectedEndOn?: number): number | undefined => {
  if (!expectedEndOn) {
    return undefined
  }
  const now = new Date();
  const endDate = new Date(expectedEndOn);

  const yearsDiff = endDate.getFullYear() - now.getFullYear();
  const monthsDiff = endDate.getMonth() - now.getMonth();

  return yearsDiff * 12 + monthsDiff;
}
