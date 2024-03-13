export const extractValue = (
  inputString: string | null,
  prefix: string,
  suffix: string,
  allStatPrefix?: string
) => {
  if (inputString === null) return 0;
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

const extractStatValue = (
  targetStat: string | undefined,
  inputString: string | null
) => {
  const prefix = `${targetStat} : `;
  const allStatPrefix = "올스탯 : ";
  const suffix = "%";

  if (inputString === null) return 0;
  if (
    (inputString.startsWith(prefix) || inputString.startsWith(allStatPrefix)) &&
    inputString.endsWith(suffix)
  ) {
    const valueString = inputString.substring(prefix.length);
    const numericValue = parseFloat(valueString);

    if (!isNaN(numericValue)) {
      return numericValue;
    }
  }
  return 0;
};
