import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* favicon */}
          <link href="/favicon.ico" rel="shortcut icon" />
          {/* SEO */}
          <meta name="keyword" content="yourgg, lol, 롤, 소환사 데이터 통계" />
          {/* 작성자 */}
          <meta name="author" content="1-blue" />
          {/* 문자 */}
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

          {/* 카카오톡, 네이버 블로그 미리보기 제공할 정보 */}
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="미정" />
          <meta property="og:locale" content="ko_KR" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="600" />

          {/* 메인 폰트: Noto Sans Korean ( https://fonts.google.com/noto/specimen/Noto+Sans+KR ) */}
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;500;700;900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
