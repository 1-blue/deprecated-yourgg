import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// component
import TierChart from "@src/components/common/TierChart";

// type
import type { FetchDataResposne } from "@src/types";

type Props1 = {
  data: FetchDataResposne;
};

const Summary = ({ data }: Props1) => {
  const { query } = useRouter();

  const [target, setTarget] = useState<
    | FetchDataResposne
    | FetchDataResposne["mostChampions"][0]
    | FetchDataResposne["mostLanes"][0]
  >(data);

  // 2022/10/26 - 특정 챔피언/라인인 경우 렌더링할 데이터 교체 - by 1-blue
  useEffect(() => {
    let index = -1;

    // 특정 챔피언
    if (query.champion) {
      index = data.mostChampions.findIndex(({ key }) => key === query.champion);

      if (index !== -1) {
        setTarget(data.mostChampions[index]);
        index = -1;
      }
    }
    // 특정 라인
    else if (query.lane) {
      index = data.mostLanes.findIndex(({ lane }) => lane === query.lane);

      if (index !== -1) {
        setTarget(data.mostLanes[index]);
        index = -1;
      }
    }
  }, [query, data]);

  return (
    <ul className="flex flex-col space-y-1">
      <li className="flex">
        <span className="basis-[100px]">
          <b>{target.role.toFixed(2)}</b>
        </span>
        <span className="flex-1">인분</span>
        <div className="relative top-[-12px] h-[24px] text-center">
          <span>{data.tier}</span>
          <br />
          <span>{data.lp}LP</span>
        </div>
      </li>
      <li className="flex">
        <span className="basis-[100px]">
          <b>
            {10 - +target.laning.toFixed(1)} : {+target.laning.toFixed(1)}
          </b>
        </span>
        <span className="flex-1">라인전</span>
      </li>
      <li className="flex">
        <span className="basis-[100px]">
          <b>{target.kda.toFixed(1)}</b>
        </span>
        <span className="pr-4 mr-auto">KDA</span>
        <TierChart tierHistory={data.tierHistory} />
      </li>
    </ul>
  );
};

export default Summary;
