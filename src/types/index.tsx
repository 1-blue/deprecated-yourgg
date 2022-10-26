/**
 * 2022/10/26 - 아이콘 형태 - by 1-blue
 */
export type IconShape = "Top" | "Jug" | "Mid" | "Adc" | "Sup";

/**
 * 2022/10/24 - 카테고리 - by 1-blue
 */
export type MatchCategory = "Normal" | "SoloRank" | "FreeRank";
/**
 * 2022/10/24 - 라인 - by 1-blue
 */
export type Lane = "Top" | "Jug" | "Mid" | "Adc" | "Sup";
/**
 * 2022/10/24 - 모스트 챔피언 - by 1-blue
 */
type MostChampion = {
  id: number;
  imageUrl: string;
  kda: number;
  key: string;
  lane: Lane;
  laning: number;
  matchCount: number;
  name: string;
  role: number;
  winRate: number;
};
/**
 * 2022/10/24 - 최근 라인별 경기 데이터 - by 1-blue
 */
type MostLane = {
  kda: number;
  lane: Lane;
  laning: number;
  matchCount: number;
  role: number;
  winRate: number;
};
/**
 * 2022/10/26 - 티어 기록 - by 1-blue
 */
type TierHistory = {
  division: string;
  leaguePoint: number;
  loses: number;
  normalizedPoint: number;
  tier: string;
  updated: number;
  wins: number;
};

/**
 * 2022/10/24 - 검색에 필요한 데이터 타입 - by 1-blue
 */
export type SearchDataType = {
  name: string;
  matchCategory?: MatchCategory;
  champion?: string;
  lane?: Lane;
};

/**
 * 2022/10/24 - 데이터 수신 타입 - by 1-blue
 */
export type FetchDataRequest = SearchDataType;
/**
 * 2022/10/24 - 데이터 송신 타입 - by 1-blue
 */
export type FetchDataResposne = {
  name: string;
  role: number;
  tier: string;
  laning: number;
  lp: number;
  kda: number;
  winRate: number;
  mostChampions: MostChampion[];
  mostLanes: MostLane[];
  tierHistory: TierHistory[];
};
