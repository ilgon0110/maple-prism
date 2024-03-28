export function extractNumbers(inputString: string | null): number {
  if (inputString === null) return 0;
  const regex = /\d+/g;
  const numbers = inputString.match(regex);
  return numbers !== null && numbers?.length > 0 ? +numbers[0] : 0;
}
