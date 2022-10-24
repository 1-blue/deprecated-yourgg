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
