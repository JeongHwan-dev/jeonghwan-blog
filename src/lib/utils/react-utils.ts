import type { ReactNode } from 'react';

/**
 * Utility function to render components a specified number of times
 * @param count Number of times to repeat
 * @param renderFunction Function that returns a component to render for each index
 * @returns Array of rendered components
 */
export function renderTimes(
  count: number,
  renderFunction: (index: number) => ReactNode,
): ReactNode[] {
  return Array.from({ length: count }, (_, index) => renderFunction(index));
}
