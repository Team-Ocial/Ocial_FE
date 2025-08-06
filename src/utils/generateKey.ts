/**
 * 주어진 문자열과 접두사를 기반으로 React의 key로 사용할 수 있는 고유한 문자열을 생성합니다.
 * 내용의 일부(최대 20자)와 임의의 숫자를 조합하여 고유성을 높입니다.
 * @param prefix - key의 종류를 구분하는 접두사 (e.g., 'desc', 'guideline')
 * @param content - key를 생성할 기반이 되는 문자열
 * @returns 생성된 고유 key (e.g., "desc-Lorem_ipsum_dolor_si-12345")
 */
export const generateKey = (prefix: string, content: string): string => {
  const partialContent = content.substring(0, 20).replace(/\s+/g, '_'); // 공백을 밑줄로 변경
  const randomSuffix = Math.random().toString(36).substring(2, 7);
  return `${prefix}-${partialContent}-${randomSuffix}`;
};
