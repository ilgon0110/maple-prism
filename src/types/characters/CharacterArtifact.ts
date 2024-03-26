export interface ICharacterArtifact {
  date: string | null;
  union_artifact_effect: {
    name: string;
    level: number;
  }[];
  union_artifact_crystal: {
    name: string;
    validity_flag: string;
    date_expire: string;
    level: number;
    crystal_option_name_1: string;
    crystal_option_name_2: string;
    crystal_option_name_3: string;
  }[];
  union_artifact_remain_ap: number;
}
