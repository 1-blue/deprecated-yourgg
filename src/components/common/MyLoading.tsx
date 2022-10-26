import { useRouter } from "next/router";

// component
import MySelect from "@src/components/common/MySelect";

const options = [
  { value: "Normal", label: "Normal" },
  { value: "SoloRank", label: "SoloRank" },
  { value: "FreeRank", label: "FreeRank" },
];

const MyLoading = () => {
  const router = useRouter();

  return (
    <article>
      {/* 이름 */}
      <section className="text-center mb-12">
        <span className="whitespace-nowrap text-6xl">
          <strong>{router.query.name}</strong>
        </span>
      </section>

      {/* 카테고리 선택 영역 */}
      <section className="mb-20">
        <MySelect options={options} />
      </section>

      {/* 인분 / 라인전 / KDA 영역 */}
      <section className="flex justify-between">
        <ul className="flex flex-col space-y-1">
          <li className="w-[30vw] h-6 bg-gray-300 rounded-md shadow-sm"></li>
          <li className="w-[30vw] h-6 bg-gray-300 rounded-md shadow-sm"></li>
          <li className="w-[30vw] h-6 bg-gray-300 rounded-md shadow-sm"></li>
        </ul>

        <div className="w-[50vw] h-20 bg-gray-300 rounded-md shadow-sm"></div>
      </section>

      <hr className="border-gray-400 border mt-12 mb-4" />

      {/* 최근 경기 기록 영역 */}
      <section className="px-4">
        <ul className="flex flex-col space-y-2">
          <li className="flex space-x-10">
            <span className="flex flex-1">최근 30 경기</span>
            <span className="text-center basis-[60px]">승률</span>
            <span className="text-center basis-[60px]">인분</span>
            <span className="text-center basis-[60px]">라인전</span>
            <span className="text-center basis-[60px]">KDA</span>
          </li>
          <li className="w-full h-12 bg-gray-300 rounded-sm shadow-sm"></li>
          <li className="w-full h-12 bg-gray-300 rounded-sm shadow-sm"></li>
          <li className="w-full h-12 bg-gray-300 rounded-sm shadow-sm"></li>
          <li className="w-full h-12 bg-gray-300 rounded-sm shadow-sm"></li>
        </ul>
      </section>
    </article>
  );
};

export default MyLoading;
