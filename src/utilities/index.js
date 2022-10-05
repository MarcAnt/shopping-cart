import { format, isValid } from "date-fns";

export const transformedDate = (dateToFormat, formatDate = "dd/MM/yyyy") => {
  const isValidDate = isValid(new Date(dateToFormat));

  if (!isValidDate) {
    throw new Error("Enter a valid date formart");
  }

  return `${format(new Date(dateToFormat), formatDate)}`;
};

export const addEllipses = (text, limit = 20) => {
  if (typeof text !== "string") throw new Error("Error: Enter a string");
  if (typeof limit !== "number")
    throw new Error("Error: Enter a valid limit number");
  if (limit <= 0) throw new Error("Error: Enter a valid limit number");
  return `${text.toString().slice(0, limit)}...`;
};

export const currencyFormat = (price, currency = "EUR") => {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency }).format(
    price
  );
};
