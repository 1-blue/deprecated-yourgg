import { useCallback, useEffect } from "react";
import { SWRConfig } from "swr";

// provider ( by Context API )
import SearchDataProvider from "@src/context/SearchDataProvider";

// css
import "../css/global.css";

// component
import Layout from "@src/components/Layout";

// type
import type { AppProps } from "next/app";

// swr fetcher
const fetcher = (url: string) => fetch(url).then((res) => res.json());

function MyApp({ Component, pageProps }: AppProps) {
  // 2022/10/27 - arrow key 스크롤 막기 - by 1-blue
  const onPreventKeyScroll = useCallback((e: KeyboardEvent) => {
    if (e.key.includes("Arrow")) e.preventDefault();
  }, []);

  // 2022/10/27 - arrow key 스크롤 막기 등록 - by 1-blue
  useEffect(() => {
    window.addEventListener("keydown", onPreventKeyScroll);

    return () => window.removeEventListener("keydown", onPreventKeyScroll);
  }, [onPreventKeyScroll]);

  return (
    <SWRConfig value={{ fetcher }}>
      <SearchDataProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SearchDataProvider>
    </SWRConfig>
  );
}

export default MyApp;
