import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * clsx와 tailwind-merge를 사용하여 Tailwind CSS 클래스명을 결합하고 병합합니다
 * @param inputs 결합할 클래스 값들 (문자열, 객체, 배열 등)
 * @returns 병합되고 중복이 제거된 클래스명 문자열
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
