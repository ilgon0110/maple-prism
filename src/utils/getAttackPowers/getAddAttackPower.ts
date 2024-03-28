import { ERROR_MESSAGES } from "@/constants/error";

export const getAddAttackPower = (
  pureAttackValue: number | undefined,
  itemLevel: number | undefined
) => {
  const add_attack_powers = [];
  if (pureAttackValue === undefined) {
    throw new Error(ERROR_MESSAGES.weaponInfo.invalidWeaponToBow);
  }
  if (itemLevel === undefined) {
    throw new Error(ERROR_MESSAGES.weaponInfo.noItemLevel);
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
