export const userProfileKeys: IuserProfileKeys = {
  all: ["userProfile"] as const,
  ocid: (name: string) => [...userProfileKeys.all, "ocid", name] as const,
  basicInfo: (ocid: string) =>
    [...userProfileKeys.all, "basicInfo", ocid] as const,
  stat: (ocid: string) => [...userProfileKeys.all, "stat", ocid] as const,
  hyperStat: (ocid: string) =>
    [...userProfileKeys.all, "hyperStat", ocid] as const,
  ability: (ocid: string) => [...userProfileKeys.all, "ability", ocid] as const,
  itemEquipment: (ocid: string, index: number) =>
    [...userProfileKeys.all, "itemEquipment", ocid, index] as const,
  cashItemEquipment: (ocid: string) =>
    [...userProfileKeys.all, "cashItemEquipment", ocid] as const,
  symbol: (ocid: string) => [...userProfileKeys.all, "symbol", ocid] as const,
  setEffect: (ocid: string) =>
    [...userProfileKeys.all, "setEffect", ocid] as const,
  petEquipment: (ocid: string) =>
    [...userProfileKeys.all, "petEquipment", ocid] as const,
  zeroSkill: (ocid: string) =>
    [...userProfileKeys.all, "zeroSkill", ocid] as const,
  hexaStat: (ocid: string) =>
    [...userProfileKeys.all, "hexaStat", ocid] as const,
  unionRaider: (ocid: string) =>
    [...userProfileKeys.all, "unionRaider", ocid] as const,
  artifact: (ocid: string) =>
    [...userProfileKeys.all, "artifact", ocid] as const,
};

export interface IuserProfileKeys {
  all: readonly ["userProfile"];
  ocid: (name: string) => readonly ["userProfile", "ocid", string];
  basicInfo: (ocid: string) => readonly ["userProfile", "basicInfo", string];
  stat: (ocid: string) => readonly ["userProfile", "stat", string];
  hyperStat: (ocid: string) => readonly ["userProfile", "hyperStat", string];
  ability: (ocid: string) => readonly ["userProfile", "ability", string];
  itemEquipment: (
    ocid: string,
    index: number
  ) => readonly ["userProfile", "itemEquipment", string, number];
  cashItemEquipment: (
    ocid: string
  ) => readonly ["userProfile", "cashItemEquipment", string];
  symbol: (ocid: string) => readonly ["userProfile", "symbol", string];
  setEffect: (ocid: string) => readonly ["userProfile", "setEffect", string];
  petEquipment: (
    ocid: string
  ) => readonly ["userProfile", "petEquipment", string];
  zeroSkill: (ocid: string) => readonly ["userProfile", "zeroSkill", string];
  hexaStat: (ocid: string) => readonly ["userProfile", "hexaStat", string];
  unionRaider: (
    ocid: string
  ) => readonly ["userProfile", "unionRaider", string];
  artifact: (ocid: string) => readonly ["userProfile", "artifact", string];
}
