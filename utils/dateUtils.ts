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

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};
