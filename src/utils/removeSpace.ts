export const removeSpace = (inputString: string | null) => {
  if (!inputString) return "";
  return inputString.replace(/\s/g, "");
};
