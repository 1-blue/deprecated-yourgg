import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

// hook
import { useData } from "@src/hooks/useData";

// util
import { combineClassNames } from "@src/libs";

// component
import Icon from "@src/components/common/Icon";
import Photo from "@src/components/common/Photo";
import MySelect from "@src/components/common/MySelect";
import MyLoading from "@src/components/common/MyLoading";
import Summary from "@src/components/Summary";
import MyNotFound from "@src/components/common/MyNotFound";

// type
import type { NextPage } from "next";

const options = [
  { value: "Normal", label: "Normal" },
  { value: "SoloRank", label: "SoloRank" },
  { value: "FreeRank", label: "FreeRank" },
];

const Name: NextPage = () => {
  const router = useRouter();
  const { asPath, query } = useRouter();
  const decodedPath = decodeURI(asPath);
  const targetIndex = decodedPath.indexOf("?");
  const basePath = encodeURI(
    targetIndex === -1 ? decodedPath : decodedPath.slice(0, targetIndex)
  );

  // 2022/10/26 - url에 matchCategory가 없다면 붙여주기 ( 기본은 "SoloRank" ) - by 1-blue
  useEffect(() => {
    if (asPath === "/[name]") return;
    if (router.query.matchCategory) return;

    router.push(
      basePath + `?matchCategory=${sessionStorage.getItem("matchCategory")}`
    );
  }, [asPath, router, basePath]);

  // >>> as 모두 수정
  const { data, isLoading, isError } = useData();

  if (!data || isLoading) return <MyLoading />;
  if (isError)
    return (
      <MyNotFound
        text={`알 수 없는 에러입니다.\n잠시후에 다시 시도해주세요!`}
      />
    );
  if (!data.mostLanes) return <MyNotFound text="소환사를 찾을 수 없습니다." />;

  return (
    <article>
      {/* 이름 */}
      <section className="text-center mb-12">
        <span className="whitespace-nowrap text-6xl">
          <strong>{data.name}</strong>
        </span>
      </section>

      {/* 카테고리 선택 */}
      <section className="mb-20">
        <MySelect options={options} />
      </section>

      {/* 인분 / 라인전 / KDA */}
      <section>
        <Summary data={data} />
      </section>

      <hr className="border-gray-400 border mt-12 mb-4" />

      {/* 최근 경기 기록 */}
      <section>
        <ul className="flex flex-col space-y-2">
          <li className="flex space-x-10 px-4 py-2">
            <span className="flex flex-1">최근 30 경기</span>
            <span className="text-center basis-[60px]">승률</span>
            <span className="text-center basis-[60px]">인분</span>
            <span className="text-center basis-[60px]">라인전</span>
            <span className="text-center basis-[60px]">KDA</span>
          </li>
          {/* 모스트 라인 */}
          {data.mostLanes.map((lane) => (
            <li key={lane.lane}>
              <Link
                href={{
                  pathname: `${basePath}`,
                  query: {
                    matchCategory: sessionStorage.getItem("matchCategory"),
                    lane: lane.lane,
                  },
                }}
              >
                <a
                  className={combineClassNames(
                    "flex items-center space-x-10 px-4 py-2 rounded-md transition-colors hover:bg-indigo-200 focus:outline-indigo-500",
                    query?.lane === lane.lane ? "bg-indigo-100" : ""
                  )}
                >
                  <div className="flex flex-1">
                    <div className="w-12 h-12 flex justify-center items-center mr-3 bg-gray-200">
                      <Icon.LaneIcon shape={lane.lane} className="w-8 h-8" />
                    </div>
                    <div className="flex flex-col">
                      <span>{lane.lane}</span>
                      <span>{lane.matchCount} 경기</span>
                    </div>
                  </div>
                  <span className="text-center basis-[60px]">
                    {Math.round(lane.winRate)}%
                  </span>
                  <span className="text-center basis-[60px]">
                    {lane.role.toFixed(2)}
                  </span>
                  <span className="text-center basis-[60px]">
                    {lane.laning.toFixed(1)}
                  </span>
                  <span className="text-center basis-[60px]">
                    {lane.kda.toFixed(2)}
                  </span>
                </a>
              </Link>
            </li>
          ))}
          {/* 모스트 챔피언 */}
          {data.mostChampions.map((champion) => (
            <li key={champion.id}>
              <Link
                href={{
                  pathname: `${basePath}`,
                  query: {
                    matchCategory: sessionStorage.getItem("matchCategory"),
                    champion: champion.key,
                  },
                }}
              >
                <a
                  className={combineClassNames(
                    "flex items-center space-x-10 px-4 py-2 rounded-md transition-colors hover:bg-indigo-200 focus:outline-indigo-500",
                    query?.champion === champion.key ? "bg-indigo-100" : ""
                  )}
                >
                  <div className="flex flex-1">
                    <Photo
                      src={champion.imageUrl}
                      alt={`${champion.name} 이미지`}
                      className="w-12 h-12 mr-3"
                      priority
                    />
                    <div className="flex flex-col">
                      <span>{champion.name}</span>
                      <span>{champion.matchCount} 경기</span>
                    </div>
                  </div>
                  <span className="text-center basis-[60px]">
                    {Math.round(champion.winRate)}%
                  </span>
                  <span className="text-center basis-[60px]">
                    {champion.role.toFixed(2)}
                  </span>
                  <span className="text-center basis-[60px]">
                    {champion.laning.toFixed(1)}
                  </span>
                  <span className="text-center basis-[60px]">
                    {champion.kda.toFixed(2)}
                  </span>
                </a>
              </Link>
            </li>
          ))}
          {/* 전적 없음 */}
          {data.mostLanes.length === 0 && (
            <div className="pt-20 pb-10 flex flex-col justify-center items-center">
              <Icon.HeroIcon shape="CircleQuestion" className="w-10 h-10" />

              <h3>최근에 플레이한 전적이 없습니다.</h3>
            </div>
          )}
        </ul>
      </section>
    </article>
  );
};

export default Name;
