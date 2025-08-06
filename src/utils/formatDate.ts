/**
 * ISO 8601 형식의 날짜 문자열을 'YYYY.MM.DD' 형식으로 변환합니다.
 * @param dateString - ISO 8601 형식의 날짜 문자열 (e.g., "2025-03-01T00:00:00.000Z")
 * @returns 포맷팅된 날짜 문자열 (e.g., "2025.03.01")
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};
