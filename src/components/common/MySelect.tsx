import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

// context
import { dataContext } from "@src/context/SearchDataProvider";

// type
import type { MouseEvent } from "react";

type Props = {
  options: { value: string; label: string }[];
};

const MySelect = ({ options }: Props) => {
  const router = useRouter();
  const { searchDatas, onChangeData } = useContext(dataContext);

  const [isHidden, setIsHidden] = useState(true);

  // 2022/10/24 - 옵션 클릭 - by 1-blue
  const onClickOption = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!(e.target instanceof HTMLLIElement)) return;

      // context api 변경
      onChangeData("matchCategory", e.target.innerText);

      // select options 숨기기
      setIsHidden(true);

      // >>> 깔끔한 방법 찾아보기
      // query string 변경
      const path = router.asPath.slice(0, router.asPath.indexOf("?"));
      router.push(path + `?matchCategory=${e.target.innerText}`);
    },
    [onChangeData, router]
  );

  // 2022/10/24 - select ref - by 1-blue
  const selectRef = useRef<null | HTMLUListElement>(null);

  // 2022/10/24 - 외부 영역 클릭 시 옵션 닫기 - by 1-blue
  // >>> e 타입 찾아서 적용하기
  const onCloseOptions = useCallback((e: any) => {
    if (!(e.target instanceof HTMLElement)) return;

    if (selectRef.current && selectRef.current.contains(e.target)) return;

    setIsHidden(true);
  }, []);

  // 2022/10/24 - 외부 영역 클릭 시 옵션 닫기 이벤트 등록 / 제거 - by 1-blue
  useEffect(() => {
    window.addEventListener("click", onCloseOptions);

    return () => window.removeEventListener("click", onCloseOptions);
  }, [isHidden, onCloseOptions]);

  return (
    <>
      {/* >>> tab, keyboard 선택 가능하도록 수정하기 */}
      <ul
        className="relative inline-block select-none cursor-pointer"
        ref={selectRef}
      >
        <li
          className="w-[140px] text-center border-gray-300 border-2 rounded-md px-1 py-0.5 font-bold after:content-['_👇']"
          onClick={() => setIsHidden((prev) => !prev)}
        >
          {searchDatas.matchCategory}
        </li>
        <div
          hidden={isHidden}
          className="w-[140px] absolute top-[36px] left-0 bg-gray-200 rounded-md origin-top animate-scaleY overflow-hidden shadow-lg"
          onClick={onClickOption}
        >
          {options.map(({ label, value }) => (
            <li
              key={label}
              className="px-3 py-1.5 text-center hover:bg-gray-300 transition-colors"
            >
              {value}
            </li>
          ))}
        </div>
      </ul>
    </>
  );
};

export default MySelect;
