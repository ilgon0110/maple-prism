export const getAddAttackPower = (
  pureAttackValue: number | undefined,
  itemLevel: number | null
) => {
  const add_attack_powers = [];
  if (pureAttackValue === undefined) {
    throw new Error("pureAttackValue is undefined");
  }
  if (itemLevel === null) {
    throw new Error("itemLevel is null");
  }
  for (let step = 1; step <= 5; step++) {
    const value = Math.ceil(
      pureAttackValue *
        0.01 *
        (Math.floor(itemLevel / 40) + 1) *
        (8 - step) *
        Math.pow(1.1, 5 - step)
    );
    add_attack_powers.push({
      step,
      value,
    });
  }
  return add_attack_powers;
};
