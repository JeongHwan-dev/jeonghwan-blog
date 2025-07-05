import type { ReactNode } from 'react';

/**
 * 컴포넌트를 지정된 횟수만큼 렌더링하는 유틸리티 함수
 * @param count 반복할 횟수
 * @param renderFunction 각 인덱스에 대해 렌더링할 컴포넌트를 반환하는 함수
 * @returns 렌더링된 컴포넌트들의 배열
 */
export function renderTimes(
  count: number,
  renderFunction: (index: number) => ReactNode,
): ReactNode[] {
  return Array.from({ length: count }, (_, index) => renderFunction(index));
}
