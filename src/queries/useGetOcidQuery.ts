import { IuserProfileKeys, userProfileKeys } from "@/queries/queryKeys";
import { ICharacterOcid } from "@/types/characters/CharacterOcid";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { getServerInstance } from "./instance";
import { AxiosError, AxiosResponse } from "axios";
import { ICharacterError } from "@/types/characters/CharacterError";

type ExtendsReturnType<T extends IuserProfileKeys["ocid"]> = ReturnType<T>;
type UserProfileKeyReturnType = ExtendsReturnType<IuserProfileKeys["ocid"]>;

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError<ICharacterError>;
  }
}

const useGetOcidQuery = <T = ICharacterOcid>(
  characterName: string | null,
  options?: Omit<
    UseQueryOptions<
      AxiosResponse<T>,
      AxiosError<ICharacterError>,
      ICharacterOcid,
      UserProfileKeyReturnType
    >,
    "queryKey" | "queryFn"
  >
) => {
  const serverInstance = getServerInstance();

  const result = useQuery({
    queryKey: userProfileKeys.ocid(characterName ?? "wrongName"),
    queryFn: () => serverInstance.get(`/id?character_name=${characterName}`),
    select: (response: AxiosResponse) => response.data,
    retry: 1,
    staleTime: Infinity,
    ...options,
  });
  return result;
};

export default useGetOcidQuery;
