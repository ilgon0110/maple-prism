export const addingMap = (
  map: Map<any, number>,
  key: string,
  value: number
) => {
  const currentValue = map.get(key);
  if (currentValue !== undefined) {
    map.set(key, value + currentValue);
  } else {
    map.set(key, value);
  }
};
