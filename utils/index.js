export const validarEmail = (email) => {
  if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) return true;
  return false;
};

export const validarPassword = (password) => {
  if (password.length > 6) return true;
  return false;
};

export const validarString = (valor) => {
  if (valor.trim().length > 2) return true;
  return false;
};
export const validarTextAreaValue = (valor) => {
  if (valor.trim().length > 5) return true;
  return false;
};
export const validarUrl = (url) => {
  if (/^(ftp|http|https):\/\/[^ "]+$/.test(url)) return true;
  return false;
};

export const generarID = () => {
  return Math.floor(Math.random() * Date.now());
};

export const formatoFecha = (fecha) => {
  if (!fecha) return;
  const opciones = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const nuevaFecha = new Date(fecha.split("T")[0].split("-"));
  return nuevaFecha.toLocaleDateString("es-ES", opciones);
};

export const getCapitalLetters = (name) => {
  if (name === "") return;
  const names = name.split(" ");
  let capitalL = names[0].substring(0, 1) + names[1].substring(0, 1);
  return capitalL;
};
