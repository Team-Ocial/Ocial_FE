// Date 객체를 'YYYY-MM-DD' 형식의 문자열로 변환 (내부 사용)
const formatDateToInput = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * 회원가입 폼의 최소 생년월일(100년 전)을 반환합니다.
 * @returns 'YYYY-MM-DD' 형식의 날짜 문자열
 */
export const getMinBirthDate = (): string => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 100);
  return formatDateToInput(date);
};

/**
 * 회원가입 폼의 최대 생년월일(만 14세)을 반환합니다.
 * @returns 'YYYY-MM-DD' 형식의 날짜 문자열
 */
export const getMaxBirthDate = (): string => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 14);
  return formatDateToInput(date);
};
