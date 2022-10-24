import { createContext, useCallback, useReducer } from "react";

// type
import type { SearchDataType } from "@src/types";

type TargetType = keyof SearchDataType;
type ContextType = {
  searchDatas: SearchDataType;
  onChangeData: (target: TargetType, value: string) => void;
};
type ActionType = {
  type: "CHANGE_DATA";
  payload: { target: TargetType; value: string };
};
type Props = {
  children: React.ReactNode;
};

// 기본값
const defaultData: SearchDataType = {
  name: "hide on bush",
  matchCategory: "SoloRank",
};

// 리듀서 생성
const todoReducer = (
  initialState: SearchDataType,
  action: ActionType
): SearchDataType => {
  switch (action.type) {
    case "CHANGE_DATA":
      return { ...initialState, [action.payload.target]: action.payload.value };

    default:
      return initialState;
  }
};

/**
 * 2022/10/24 - data context - by 1-blue
 * 검색에 필요한 데이터들을 가진 context ( name, category, champion, lane )
 */
export const dataContext = createContext<ContextType>({
  searchDatas: defaultData,
  onChangeData: () => {},
});

/**
 * 2022/10/24 - data provider - by 1-blue
 * @param param0
 * @returns
 */
const SearchDataProvider = ({ children }: Props) => {
  const [searchDatas, dispatch] = useReducer(todoReducer, defaultData);

  // 데이터 변경
  const onChangeData = useCallback(
    (target: TargetType, value: string) => {
      dispatch({ type: "CHANGE_DATA", payload: { target, value } });
    },
    [dispatch]
  );

  return (
    <dataContext.Provider
      value={{
        searchDatas,
        onChangeData,
      }}
    >
      {children}
    </dataContext.Provider>
  );
};

export default SearchDataProvider;
