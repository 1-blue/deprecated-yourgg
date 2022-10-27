import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

// context
import { dataContext } from "@src/context/SearchDataProvider";

// type
import type { MouseEvent, KeyboardEvent } from "react";

type Props = {
  options: { value: string; label: string }[];
};

const MySelect = ({ options }: Props) => {
  const router = useRouter();
  const decodedPath = decodeURI(router.asPath);
  const targetIndex = decodedPath.indexOf("?");
  const basePath = encodeURI(
    targetIndex === -1 ? decodedPath : decodedPath.slice(0, targetIndex)
  );
  const { searchDatas, onChangeData } = useContext(dataContext);

  const [isHidden, setIsHidden] = useState(true);

  // 2022/10/24 - 옵션 클릭 - by 1-blue
  const onClickOption = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!(e.target instanceof HTMLButtonElement)) return;

      // context api 변경
      onChangeData("matchCategory", e.target.innerText);

      // select options 숨기기
      setIsHidden(true);

      // query string 변경
      router.push(basePath + `?matchCategory=${e.target.innerText}`);
    },
    [onChangeData, basePath, router]
  );

  // 2022/10/24 - select ref - by 1-blue
  const selectRef = useRef<null | HTMLUListElement>(null);

  // 2022/10/24 - 외부 영역 클릭 시 옵션 닫기 - by 1-blue
  const onCloseOptions = useCallback((e: globalThis.MouseEvent) => {
    if (!(e.target instanceof HTMLElement)) return;

    if (selectRef.current && selectRef.current.contains(e.target)) return;

    setIsHidden(true);
  }, []);

  // 2022/10/24 - 외부 영역 클릭 시 옵션 닫기 이벤트 등록 / 제거 - by 1-blue
  useEffect(() => {
    window.addEventListener("click", onCloseOptions);

    return () => window.removeEventListener("click", onCloseOptions);
  }, [isHidden, onCloseOptions]);

  // 2022/10/27 - option들의 컨테이너 ref - by 1-blue
  const optionContainerRef = useRef<HTMLDivElement>(null);
  // 2022/10/27 - 현재 focus중인 option ( option에 focus 시 사용 ) - by 1-blue
  const [index, setIndex] = useState(-1);

  // 2022/10/27 - 키보드 방향키로 option들 이동 - by 1-blue
  const onMoveCategory = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (!optionContainerRef.current) return;

      const options = [...optionContainerRef.current.children].filter(
        (v): v is HTMLButtonElement => v instanceof HTMLButtonElement
      );

      // 클릭
      if (e.target instanceof HTMLButtonElement && e.key === "Enter") {
        e.target.click();
      }

      // 위 화살표 클릭
      if (e.key === "ArrowUp") {
        // 맨 위에서 위 버튼 클릭 시 실행
        if (index - 1 < 0) {
          options[options.length - 1].focus();
          setIndex(options.length - 1);
        }
        // 일반적으로 위 버튼 클릭 시 실행
        else {
          options[index - 1].focus();
          setIndex((prev) => prev - 1);
        }
      }
      // 아래 화살표 클릭
      else if (e.key === "ArrowDown") {
        // 맨 아래에서 아래 버튼 클릭 시 실행
        if (index + 1 >= options.length) {
          options[0].focus();
          setIndex(0);
        }
        // 일반적으로 아래 버튼 클릭 시 실행
        else {
          options[index + 1].focus();
          setIndex((prev) => prev + 1);
        }
      }
    },
    [index]
  );

  return (
    <ul
      className="relative inline-block select-none cursor-pointer"
      ref={selectRef}
    >
      <button
        type="button"
        className="w-[140px] text-center border-gray-300 border-2 rounded-md px-1 py-0.5 font-bold after:content-['_👇'] focus:outline-indigo-500"
        onClick={() => setIsHidden((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key !== "ArrowDown") return;
          if (!optionContainerRef.current) return;

          (optionContainerRef.current.firstChild as HTMLButtonElement).focus();
          setIndex(0);
        }}
      >
        {searchDatas.matchCategory}
      </button>
      <div
        hidden={isHidden}
        className="absolute top-[36px] left-0 bg-gray-200 rounded-md origin-top animate-scaleY overflow-hidden shadow-lg"
        onClick={onClickOption}
        ref={optionContainerRef}
        onKeyDown={onMoveCategory}
      >
        {options.map(({ label, value }) => (
          <button
            type="button"
            key={label}
            className="w-[140px] px-3 py-1.5 text-center hover:bg-gray-300 transition-colors focus:outline-none focus:bg-gray-300"
          >
            {value}
          </button>
        ))}
      </div>
    </ul>
  );
};

export default MySelect;
