// hook
import { useUserData } from "@src/hooks/useUserData";

// type
import type { NextPage } from "next";

const Home: NextPage = () => {
  const { data, isError, isLoading } = useUserData({
    name: "hide on bush",
    matchCategory: "SoloRank",
    lane: "Mid",
  });

  if (!data && isLoading) return <>로딩중...</>;
  if (isError) return <>에러 처리...</>;

  return <></>;
};

export default Home;
