import moment from "moment";

export const formatDate = (
  timestamp: number,
  pattern: string = "DD/MM/YYYY"
): string => {
  return moment(timestamp).format(pattern);
};

export const convertDateFormat = (publishedDate: string): string => {
  const date = new Date(publishedDate);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

// function convert date to string with pattern
export const convertDateToString = (date: Date, pattern: string): string => {
  return moment(date).format(pattern);
};

// function convert string to date
export const convertStringToDate = (date: string, pattern: string): Date => {
  return moment(date, pattern).toDate();
};

export const formatDateTime = (dateString: string): string => {
  return moment(dateString).format("DD/MM/YYYY HH:mm:ss");
};
