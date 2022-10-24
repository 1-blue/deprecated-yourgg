/**
 * 나열된 클래스명을 공백기준으로 합친 문자열로 만들어주는 헬퍼함수
 * @param classname 클래스 이름들
 * @returns 하나의 문자열로 합쳐진 클래스 이름
 */
export const combineClassNames = (...classname: string[]) =>
  classname.join(" ");
