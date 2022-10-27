import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

type Props = {
  title?: string;
  description?: string;
  photo?: string | null;
};

const HeadInfo = ({ title, description, photo }: Props) => {
  const { asPath } = useRouter();

  const basePath =
    (process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_BASE_URL) + asPath;

  return (
    <Head>
      {/* 현 페이지 제목 */}
      <title>{title}</title>

      {/* 현 페이지 설명 */}
      <meta name="description" content={description} />

      {/* 카카오톡, 네이버 블로그 미리보기에 제공될 정보 */}
      <meta property="og:url" content={basePath} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={photo || "/logo.png"} />

      {/* 트위터 */}
      <meta name="twitter:card" content={`${title}\n${description}`} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={photo || "/logo.png"} />
    </Head>
  );
};

HeadInfo.defaultProps = {
  title: "YourGG 과제",
  description: "YourGG 과제 사이트입니다.",
};

export default HeadInfo;
