import { useContext } from "react";

// context
import { dataContext } from "@src/context/SearchDataProvider";

// hook
import { useUserData } from "@src/hooks/useUserData";

// component
import Photo from "@src/components/common/Photo";
import MySelect from "@src/components/common/MySelect";

// type
import type { NextPage } from "next";

const options = [
  { value: "Normal", label: "Normal" },
  { value: "SoloRank", label: "SoloRank" },
  { value: "FreeRank", label: "FreeRank" },
];

const Home: NextPage = () => {
  const { searchDatas } = useContext(dataContext);
  const { data, isError, isLoading } = useUserData(searchDatas);

  if (!data || isLoading) return <>로딩중...</>;
  if (isError) return <>에러 처리...</>;

  return (
    <>
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
          <ul className="flex flex-col space-y-1">
            <li className="flex">
              <span className="basis-[100px]">
                <b>{data.role.toFixed(2)}</b>
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
                  {10 - +data.laning.toFixed(1)} : {data.laning.toFixed(1)}
                </b>
              </span>
              <span className="flex-1">라인전</span>
            </li>
            {/*  >>> 날짜로 변경 (날짜값이 안보임), 그래프( tierHistory ) */}
            <li className="flex">
              <span className="basis-[100px]">
                <b>{data.kda.toFixed(1)}</b>
              </span>
              <span className="flex-1">KDA</span>
              {/* <span>{data.winRate.toFixed(2)}%</span> */}
            </li>
          </ul>
        </section>

        <hr className="border-gray-400 border mt-12 mb-4" />

        {/* 최근 경기 기록 */}
        <section>
          <ul className="flex flex-col space-y-1">
            <li key={-1} className="flex space-x-10">
              <span className="flex flex-1">최근 30 경기</span>
              <span className="text-center basis-[60px]">승률</span>
              <span className="text-center basis-[60px]">인분</span>
              <span className="text-center basis-[60px]">라인전</span>
              <span className="text-center basis-[60px]">KDA</span>
            </li>
            {/* 모스트 라인 */}
            {data.mostLanes.map((lane) => (
              <li key={lane.lane} className="flex items-center space-x-10">
                <div className="flex flex-1">
                  {/* >>> 임시로 이미지 대체 */}
                  <div className="w-12 h-12 mr-3 bg-gray-400" />
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
              </li>
            ))}
            {/* 모스트 챔피언 */}
            {data.mostChampions.map((v) => (
              <li key={v.id} className="flex items-center space-x-10">
                <div className="flex flex-1">
                  <Photo
                    src={v.imageUrl}
                    alt={`${v.name} 이미지`}
                    className="w-12 h-12 mr-3"
                    priority
                  />
                  <div className="flex flex-col">
                    <span>{v.name}</span>
                    <span>{v.matchCount} 경기</span>
                  </div>
                </div>
                <span className="text-center basis-[60px]">
                  {Math.round(v.winRate)}%
                </span>
                <span className="text-center basis-[60px]">
                  {v.role.toFixed(2)}
                </span>
                <span className="text-center basis-[60px]">
                  {v.laning.toFixed(1)}
                </span>
                <span className="text-center basis-[60px]">
                  {v.kda.toFixed(2)}
                </span>
              </li>
            ))}
            {/* >>> 기록 없음 ( 디자인 수정 ) */}
            {data.mostLanes.length === 0 && <>기록된 전적이 없습니다.</>}
          </ul>
        </section>
      </article>
    </>
  );
};

export default Home;
