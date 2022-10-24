/**
 * 2022/10/24 - 카테고리 - by 1-blue
 */
export type MatchCategory = "Normal" | "SoloRank" | "FreeRank";

/**
 * 2022/10/24 - 라인 - by 1-blue
 */
export type Lane = "Top" | "Jug" | "Mid" | "Adc" | "Sup";

/**
 * 2022/10/24 - 지역 - by 1-blue
 */
export type Region = "kr";
/**
 * 2022/10/24 - 팀 - by 1-blue
 */
export type Team = "T1";

/**
 * 2022/10/24 - 데이터 수신 타입 - by 1-blue
 */
export type FetchDataRequest = {
  name: string | "hide on bush";
  matchCategory: MatchCategory;
  champion?: string;
  lane: Lane;
};

/**
 * 2022/10/24 - 데이터 송신 타입 - by 1-blue
 */
export type FetchDataResposne = {
  name: string;
};
