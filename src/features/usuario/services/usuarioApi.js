export const getUserLocal = () => {
  return JSON.parse(localStorage.getItem("user") || "{}");
};
