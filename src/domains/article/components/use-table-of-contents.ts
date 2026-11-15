import { useEffect, useMemo, useState } from 'react';

import type { Toc } from '@stefanprobst/rehype-extract-toc';

interface TableOfContentsItem {
  depth: number;
  id: string;
  value: string;
}

interface ActiveRange {
  first: number;
  isMovingUp: boolean;
  last: number;
}

function flattenToc(toc: Toc, depth = 0): TableOfContentsItem[] {
  return toc.flatMap(({ children = [], id, value }) => [
    ...(id === undefined ? [] : [{ depth, id, value }]),
    ...flattenToc(children, depth + 1),
  ]);
}

function isInRange(index: number, range: ActiveRange | null) {
  return range !== null && index >= range.first && index <= range.last;
}

function getVisibleRange(itemList: TableOfContentsItem[]) {
  let lastAbove = -1;
  let first = -1;
  let last = -1;

  for (const [index, { id }] of itemList.entries()) {
    const heading = document.getElementById(id);

    if (heading === null) {
      continue;
    }

    const rect = heading.getBoundingClientRect();

    if (rect.bottom > window.innerHeight) {
      break;
    }

    if (rect.top < Number.parseFloat(getComputedStyle(heading).scrollMarginTop)) {
      lastAbove = index;
      continue;
    }

    if (first === -1) {
      first = index;
    }

    last = index;
  }

  if (first !== -1) {
    return { first, last };
  }

  return lastAbove === -1 ? null : { first: lastAbove, last: lastAbove };
}

function useTableOfContents(toc: Toc) {
  const itemList = useMemo(() => flattenToc(toc), [toc]);
  const [activeRange, setActiveRange] = useState<ActiveRange | null>(null);

  useEffect(() => {
    let frame = 0;

    const updateActiveRange = () => {
      frame = 0;

      const visibleRange = getVisibleRange(itemList);

      if (visibleRange === null) {
        setActiveRange(null);
        return;
      }

      setActiveRange((previous) => {
        if (previous?.first === visibleRange.first && previous.last === visibleRange.last) {
          return previous;
        }

        return {
          ...visibleRange,
          isMovingUp:
            previous !== null &&
            (previous.first > visibleRange.first || previous.last > visibleRange.last),
        };
      });
    };

    const handleScroll = () => {
      if (frame === 0) {
        frame = requestAnimationFrame(updateActiveRange);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [itemList]);

  return { activeRange, itemList };
}

export { isInRange, useTableOfContents };
export type { ActiveRange, TableOfContentsItem };
