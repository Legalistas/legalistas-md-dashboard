const state = (state) => {
  const array = {
    won: "Ganado",
    lost: "Perdido",
    pending: "En progreso",
  };

  return array[state];
};

export { state };