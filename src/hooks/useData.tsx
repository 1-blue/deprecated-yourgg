import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

// type
import type { FetchDataResposne } from "@src/types";

/**
 * https://api.your.gg/kr/api/summoners/hide%20on%20bush?matchCategory={Normal,%20SoloRank,%20FreeRank}&champion={%EC%B1%94%ED%94%BC%EC%96%B8%20ID}&lane={Top,%20Jug,%20Mid,%20Adc,%20Sup}
 * 2022/10/24 - 특정 유저의 특정 정보들 요청 - by 1-blue
 * @param name 유저 닉네임
 * @param matchCategory 카테고리 ( "Normal" | "SoloRank" | "FreeRank" )
 * @param lane 라인 ( "Top" | "Jug" | "Mid" | "Adc" | "Sup" )
 * @param champion 챔피언 이름
 * @returns 결괏값
 */
export const useData = () => {
  const {
    query: { name, matchCategory, champion, lane },
  } = useRouter();
  const [storageMatchCateogory, setStorageMatchCategory] = useState<
    string | null
  >(null);

  const { data, error } = useSWR<FetchDataResposne>(
    `https://api.your.gg/kr/api/summoners/${name}?matchCategory=${
      (storageMatchCateogory && matchCategory) || "SoloRank"
    }` +
      (lane ? `lane=${lane}` : "") +
      (champion ? `champion=${champion}` : "")
  );

  // 2022/10/25 - "sessionStorage"의 "matchCategory"을 가져옴 - by 1-blue
  useEffect(() => {
    setStorageMatchCategory(sessionStorage.getItem("matchCategory"));
  }, [matchCategory]);

  // 2022/10/25 - "sessionStorage"에 "matchCategory"을 기록 - by 1-blue
  useEffect(() => {
    if (typeof matchCategory !== "string") return;

    sessionStorage.setItem("matchCategory", matchCategory);
  }, [matchCategory]);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
