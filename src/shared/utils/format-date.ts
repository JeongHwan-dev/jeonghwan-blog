import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

/**
 * 날짜를 한국어 로케일 형식의 문자열로 변환합니다
 * @param date 변환할 날짜 (Date 객체, 문자열, 또는 undefined)
 * @returns 한국어 로케일로 포맷된 날짜 문자열, date가 undefined인 경우 빈 문자열 반환
 */
export function formatDate(date: Date | string | undefined): string {
  if (date === undefined) {
    return '';
  }

  return format(new Date(date), 'PPP', {
    locale: ko,
  });
}
