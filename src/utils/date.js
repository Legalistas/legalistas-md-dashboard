import { format, parseISO } from "date-fns";

const getShortDate = (dateString) => {
  const date = parseISO(dateString);
  if (isNaN(date)) {
    return "Fecha inválida"; // Retorna un mensaje si la fecha no es válida
  }
  return format(date, "yyyy-MM"); // Aseguramos el formato yyyy-MM
};

export { getShortDate };

