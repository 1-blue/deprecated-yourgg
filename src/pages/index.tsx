import { useCallback, useState } from "react";
import { useRouter } from "next/router";

// component
import HeadInfo from "@src/components/common/HeadInfo";
import Icon from "@src/components/common/Icon";

// type
import type { NextPage } from "next";
import type { FormEvent } from "react";

const Home: NextPage = () => {
  const router = useRouter();

  // 2022/10/27 - 검색어 - by 1-blue
  const [name, setName] = useState("");

  // 2022/10/27 - 검색 - by 1-blue
  const onSearchUser = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (name.length === 0) return alert("이름을 입력해주세요!");

      router.push({
        pathname: name,
        query: {
          matchCategory: sessionStorage.getItem("matchCategory") || "SoloRank",
        },
      });
    },
    [router, name]
  );

  return (
    <>
      <HeadInfo
        title={`YourGG 과제 - 소환사 검색`}
        description="소환사 검색 페이지입니다."
      />

      <form
        className="flex flex-col justify-center items-center"
        onSubmit={onSearchUser}
      >
        <div className="h-10 flex justify-center">
          <input
            type="search"
            placeholder="소환사 이름을 입력해주세요."
            className="h-full px-3 placeholder:text-sm focus:outline-none"
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type="submit"
            className="h-full bg-indigo-400 px-2 rounded-r-md transition-colors focus:outline-none focus:bg-indigo-500 hover:bg-indigo-500"
          >
            <Icon.HeroIcon shape="Search" className="w-6 h-6 text-white" />
          </button>
        </div>
      </form>
    </>
  );
};

export default Home;
