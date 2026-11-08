const koreanLongDate = new Intl.DateTimeFormat('ko-KR', {
  dateStyle: 'long',
  timeZone: 'Asia/Seoul',
});

/**
 * 날짜를 한국어 로케일 형식의 문자열로 변환합니다 (예: 2025년 1월 5일)
 * @param date 변환할 날짜 (Date 객체, 문자열, 또는 undefined)
 * @returns 한국어 로케일로 포맷된 날짜 문자열, date가 undefined인 경우 빈 문자열 반환
 */
export function formatDate(date: Date | string | undefined): string {
  if (date === undefined) {
    return '';
  }

  return koreanLongDate.format(new Date(date));
}
