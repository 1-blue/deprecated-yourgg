# 😀 사이트 이름 없음
YourGG 과제 사이트입니다.

<section align="center">
  <h2 style="text-align: center; margin: 0;">🛠️ 사용 라이브러리 🛠️</h2>
  <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCss-06B6D4?style=flat-square&logo=TailwindCss&logoColor=white" />
  <img src="https://img.shields.io/badge/SWR-000000?style=flat-square" />
  <img src="https://img.shields.io/badge/ApexCharts-0D73E7?style=flat-square" />
</section>

<section align="center">
  <h2 style="text-align: center; margin: 0;">💁‍♂️ 사용 툴 🙋‍♂️</h2>
  <img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=Git&logoColor=white" />
  <img src="https://img.shields.io/badge/GitHub-000000?style=flat-square&logo=GitHub&logoColor=white" />
  <img src="https://img.shields.io/badge/Sourcetree-0052CC?style=flat-square&logo=Sourcetree&logoColor=white" />
  <img src="https://img.shields.io/badge/VsCode-007ACC?style=flat-square&logo=VisualStudioCode&logoColor=white" />
</section>

# 🙌 구현 기능
1. 소환사 검색
2. 매치 카테고리 / 챔피언 / 라인 선택 및 browser history 유지
3. 로딩 UI / 에러 UI 구현
4. 티어 차트 구현 ( by ApexCharts )

# 🛠️ 제작환경
1. OS: `Window11`
2. editor: `VSCode`, `Sourcetree`
3. terminal: `git bash`
4. vcs: `Git` / `GitHub`
5. Front: `Next.js`

# 👇 가이드라인
- 종속성 설치
```bash
npm install
```

+ 실행
```bash
npm run dev

rm -rf .next && npm run build && npm start
```

# 문제
1. 가끔 `matchCategory` 동기화 안됨 ( `router.query.matchCategory` 자체가 값이 불일치해서 발생해서 일단 `setTimeout()`으로 해결함... )