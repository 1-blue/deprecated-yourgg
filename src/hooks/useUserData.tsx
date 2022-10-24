import useSWR from "swr";

// type
import type { FetchDataRequest, FetchDataResposne } from "@src/types";

/**
 * https://api.your.gg/kr/api/summoners/hide%20on%20bush?matchCategory={Normal,%20SoloRank,%20FreeRank}&champion={%EC%B1%94%ED%94%BC%EC%96%B8%20ID}&lane={Top,%20Jug,%20Mid,%20Adc,%20Sup}
 * 2022/10/24 - 특정 유저의 특정 정보들 요청 - by 1-blue
 * @param name 유저 닉네임
 * @param matchCategory 카테고리 ( "Normal" | "SoloRank" | "FreeRank" )
 * @param lane 라인 ( "Top" | "Jug" | "Mid" | "Adc" | "Sup" )
 * @param champion 챔피언 이름
 * @returns 결괏값
 */
export const useUserData = ({
  name,
  matchCategory,
  lane,
  champion,
}: FetchDataRequest) => {
  const { data, error } = useSWR<FetchDataResposne>(
    `https://api.your.gg/kr/api/summoners/${name}?matchCategory=${matchCategory}&lane=${lane}` +
      (champion ? `champion=${champion}` : "")
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
