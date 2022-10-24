import { SWRConfig } from "swr";

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
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}

export default MyApp;
