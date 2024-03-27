export const extractValue = (
  inputString: string,
  prefix: string,
  suffix: string,
  allStatPrefix?: string
) => {
  if (allStatPrefix) {
    const isValidString =
      (inputString.startsWith(prefix) ||
        inputString.startsWith(allStatPrefix)) &&
      inputString.endsWith(suffix);
    if (isValidString) {
      const valueString = inputString.substring(prefix.length);
      const numericValue = parseFloat(valueString);

      if (!isNaN(numericValue)) {
        return numericValue;
      }
    }
  } else if (suffix === "") {
    if (inputString.startsWith(prefix) && !inputString.endsWith("%")) {
      const valueString = inputString.substring(prefix.length);
      const numericValue = parseFloat(valueString);

      if (!isNaN(numericValue)) {
        return numericValue;
      }
    }
  } else if (inputString.startsWith(prefix) && inputString.endsWith(suffix)) {
    const valueString = inputString.substring(prefix.length);
    const numericValue = parseFloat(valueString);

    if (!isNaN(numericValue)) {
      return numericValue;
    }
  }
  return 0;
};
