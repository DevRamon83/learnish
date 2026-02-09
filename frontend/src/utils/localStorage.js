export const boilerPlate = {
  language: "italian",
  darkMode: false,
};

export const createSettings = () => {
  const myJSON = JSON.stringify(boilerPlate);
  localStorage.setItem("settings", myJSON);
};

export const getSettings = () => {
  return localStorage.getItem("settings");
};
