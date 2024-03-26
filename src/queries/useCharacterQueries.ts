import { useQueries } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { getServerInstance } from "./instance";
import { userProfileKeys } from "./queryKeys";
import { ICharacterBasicInfo } from "@/types/characters/CharacterBasicInfo";
import { ICharacterStat } from "@/types/characters/CharacterStat";
import { ICharacterError } from "@/types/characters/CharacterError";
import { ICharacterHyperStat } from "@/types/characters/CharacterHyperStat";
import { ICharacterAbility } from "@/types/characters/CharacterAbility";
import { ICharacterItemEquipment } from "@/types/characters/CharacterItemEquipment";
import { ICharacterCashItemEquipment } from "@/types/characters/CharacterCashItemEquipment";
import { ICharacterSymbol } from "@/types/characters/CharacterSymbol";
import { ICharacterSetEffect } from "@/types/characters/CharacterSetEffect";
import { ICharacterPetEquipment } from "@/types/characters/CharacterPetEquipment";
import { ICharacterSkill } from "@/types/characters/CharacterSkill";
import { ICharacterHexaStat } from "@/types/characters/CharacterHexaStat";
import { ICharacterUnionRaider } from "@/types/characters/CharacterUnionRaider";
import { ICharacterArtifact } from "@/types/characters/CharacterArtifact";

export const useCharacterQueries = (
  ocid: string | undefined,
  presets: { ability: number; hyperStat: number; union: number }
) => {
  const serverInstance = getServerInstance();
  //const yesterday = dayjs().add(-2, "day").format("YYYY-MM-DD");
  const id = ocid ?? "wrongOcid";
  const results = useQueries({
    queries: [
      {
        queryKey: userProfileKeys.basicInfo(id),
        queryFn: () => serverInstance.get(`/character/basic?ocid=${ocid}`),
        select: (response: AxiosResponse): ICharacterBasicInfo => response.data,
        staleTime: Infinity,
        enabled: !!ocid,
      },
      {
        queryKey: userProfileKeys.stat(id),
        queryFn: () => serverInstance.get(`/character/stat?ocid=${ocid}`),
        select: (response: AxiosResponse): ICharacterStat => response.data,
        staleTime: Infinity,
        enabled: !!ocid,
      },
      {
        queryKey: userProfileKeys.hyperStat(id),
        queryFn: () => serverInstance.get(`/character/hyper-stat?ocid=${ocid}`),
        select: (response: AxiosResponse): ICharacterHyperStat => response.data,
        staleTime: Infinity,
        enabled: !!ocid,
      },
      {
        queryKey: userProfileKeys.ability(id),
        queryFn: () => serverInstance.get(`/character/ability?ocid=${ocid}`),
        select: (response: AxiosResponse): ICharacterAbility => response.data,
        staleTime: Infinity,
        enabled: !!ocid,
      },
      {
        queryKey: userProfileKeys.itemEquipment(id, 0),
        queryFn: () =>
          serverInstance.get(`/character/item-equipment?ocid=${ocid}`),
        select: (response: AxiosResponse): ICharacterItemEquipment =>
          response.data,
        staleTime: Infinity,
        enabled: !!ocid,
      },
      {
        queryKey: userProfileKeys.cashItemEquipment(id),
        queryFn: () =>
          serverInstance.get(`/character/cashitem-equipment?ocid=${ocid}`),
        select: (response: AxiosResponse): ICharacterCashItemEquipment =>
          response.data,
        staleTime: Infinity,
        enabled: !!ocid,
      },
      {
        queryKey: userProfileKeys.symbol(id),
        queryFn: () =>
          serverInstance.get(`/character/symbol-equipment?ocid=${ocid}`),
        select: (response: AxiosResponse): ICharacterSymbol => response.data,
        staleTime: Infinity,
        enabled: !!ocid,
      },
      {
        queryKey: userProfileKeys.setEffect(id),
        queryFn: () => serverInstance.get(`/character/set-effect?ocid=${ocid}`),
        select: (response: AxiosResponse): ICharacterSetEffect => response.data,
        staleTime: Infinity,
        enabled: !!ocid,
      },
      {
        queryKey: userProfileKeys.petEquipment(id),
        queryFn: () =>
          serverInstance.get(`/character/pet-equipment?ocid=${ocid}`),
        select: (response: AxiosResponse): ICharacterPetEquipment =>
          response.data,
        staleTime: Infinity,
        enabled: !!ocid,
      },
      {
        queryKey: userProfileKeys.zeroSkill(id),
        queryFn: () =>
          serverInstance.get(
            `/character/skill?ocid=${ocid}&character_skill_grade=0`
          ),
        select: (response: AxiosResponse): ICharacterSkill => response.data,
        staleTime: Infinity,
        enabled: !!ocid,
      },
      {
        queryKey: userProfileKeys.hexaStat(id),
        queryFn: () =>
          serverInstance.get(`/character/hexamatrix-stat?ocid=${ocid}`),
        select: (response: AxiosResponse): ICharacterHexaStat => response.data,
        staleTime: Infinity,
        enabled: !!ocid,
      },
      {
        queryKey: userProfileKeys.unionRaider(id),
        queryFn: () => serverInstance.get(`/user/union-raider?ocid=${ocid}`),
        select: (response: AxiosResponse): ICharacterUnionRaider =>
          response.data,
        staleTime: Infinity,
        enabled: !!ocid,
      },
      {
        queryKey: userProfileKeys.artifact(id),
        queryFn: () => serverInstance.get(`/user/union-artifact?ocid=${ocid}`),
        select: (response: AxiosResponse): ICharacterArtifact => response.data,
        staleTime: Infinity,
        enabled: !!ocid,
      },
    ],
  });

  return results;
};
