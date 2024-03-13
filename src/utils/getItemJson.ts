export const getItemJson = (json: any) => {
  const tmp = [];
  for (let key in json) {
    tmp.push({ name: key, url: json[key] });
  }
  return tmp;
};
