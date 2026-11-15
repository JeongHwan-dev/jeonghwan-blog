'use client';

import Link from 'next/link';
import { type MouseEvent, useEffect, useMemo, useRef, useState } from 'react';

import type { Toc } from '@stefanprobst/rehype-extract-toc';
import { TextAlignStart } from 'lucide-react';

import {
  buttonVariants,
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/components';
import { cn } from '@/shared/utils';
import {
  getDotDistance,
  getRail,
  getRailBottom,
  getRailTop,
  getTextIndent,
  ROW_HEIGHT,
} from './table-of-contents-rail';
import {
  type ActiveRange,
  isInRange,
  type TableOfContentsItem,
  useTableOfContents,
} from './use-table-of-contents';

interface TableOfContentsProps {
  itemList: Toc;
}

interface TableOfContentsNavProps {
  activeRange: ActiveRange | null;
  itemList: TableOfContentsItem[];
  onItemClick?: (event: MouseEvent<HTMLAnchorElement>, id: string) => void;
}

const BAR_WIDTH_CLASS_NAME_LIST = ['w-4', 'w-3', 'w-2'];

function TableOfContentsNav({ activeRange, itemList, onItemClick }: TableOfContentsNavProps) {
  const { height, offsetList, path, width } = useMemo(() => getRail(itemList), [itemList]);
  const activeTop = activeRange === null ? 0 : getRailTop(activeRange.first);
  const activeBottom = activeRange === null ? 0 : getRailBottom(activeRange.last);
  const dotDistance = getDotDistance(activeRange, offsetList);

  return (
    <nav aria-label="글 목차 네비게이션" className="relative flex flex-col text-sm">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0"
        style={{
          height,
          width,
        }}
      >
        <svg fill="none" className="absolute size-full">
          <path d={path} className="stroke-border" />
        </svg>
        <svg
          fill="none"
          className="absolute size-full transition-[clip-path] motion-reduce:transition-none"
          style={{
            clipPath: `polygon(0 ${activeTop}px, 100% ${activeTop}px, 100% ${activeBottom}px, 0 ${activeBottom}px)`,
          }}
        >
          <path d={path} className="stroke-primary" />
        </svg>
        <div
          className={cn(
            'bg-primary absolute left-0 size-1 rounded-full transition-[opacity,offset-distance] motion-reduce:transition-none',
            activeRange === null && 'opacity-0',
          )}
          style={{
            offsetDistance: `${dotDistance}px`,
            offsetPath: `path("${path}")`,
          }}
        />
      </div>
      {itemList.map(({ depth, id, value }, index) => (
        <Link
          key={id}
          href={{
            hash: id,
          }}
          title={value}
          aria-current={index === activeRange?.first ? 'location' : undefined}
          data-active={isInRange(index, activeRange)}
          className="text-muted-foreground hover:text-foreground data-[active=true]:text-primary truncate transition-colors"
          onClick={(event) => onItemClick?.(event, id)}
          style={{
            height: ROW_HEIGHT,
            lineHeight: `${ROW_HEIGHT}px`,
            paddingLeft: getTextIndent(depth),
          }}
        >
          {value}
        </Link>
      ))}
    </nav>
  );
}

function TableOfContentsLabel() {
  return (
    <>
      <TextAlignStart aria-hidden="true" className="size-4" />
      목차
    </>
  );
}

function TableOfContents({ itemList: toc }: TableOfContentsProps) {
  const { activeRange, itemList } = useTableOfContents(toc);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pendingHashRef = useRef<string | null>(null);

  useEffect(() => {
    const hash = pendingHashRef.current;

    if (isDrawerOpen || hash === null) {
      return;
    }

    pendingHashRef.current = null;
    const frame = requestAnimationFrame(() => {
      window.location.hash = hash;
    });

    return () => cancelAnimationFrame(frame);
  }, [isDrawerOpen]);

  return (
    <>
      <aside className="group fixed top-1/2 right-6 z-10 hidden -translate-y-1/2 lg:block">
        <div
          aria-hidden="true"
          className="flex flex-col items-end gap-2.5 p-3 transition-opacity duration-300 group-focus-within:opacity-0 group-hover:opacity-0 motion-reduce:transition-none"
        >
          {itemList.map(({ depth, id }, index) => (
            <span
              key={id}
              className={cn(
                'bg-muted-foreground/40 h-0.5 rounded-full transition-colors',
                BAR_WIDTH_CLASS_NAME_LIST[Math.min(depth, BAR_WIDTH_CLASS_NAME_LIST.length - 1)],
                isInRange(index, activeRange) && 'bg-primary',
              )}
            />
          ))}
        </div>
        <div className="bg-popover ease-out-quint pointer-events-none absolute top-1/2 right-0 max-h-[70vh] w-64 translate-x-2 -translate-y-1/2 overflow-y-auto rounded-2xl border p-4 opacity-0 shadow-lg transition duration-300 group-focus-within:pointer-events-auto group-focus-within:translate-x-0 group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:transition-none">
          <p className="text-muted-foreground mb-2 flex items-center gap-2 text-sm">
            <TableOfContentsLabel />
          </p>
          <TableOfContentsNav activeRange={activeRange} itemList={itemList} />
        </div>
      </aside>
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger
          aria-label="목차 열기"
          className={buttonVariants({
            className: 'fixed right-5 bottom-5 z-20 size-11 rounded-full shadow-md lg:hidden',
            size: 'icon',
            variant: 'outline',
          })}
        >
          <TextAlignStart aria-hidden="true" />
        </DrawerTrigger>
        <DrawerContent>
          <div className="overflow-y-auto px-5 pt-4 pb-6">
            <DrawerTitle className="text-muted-foreground mb-2 flex items-center gap-2 text-sm font-normal">
              <TableOfContentsLabel />
            </DrawerTitle>
            <TableOfContentsNav
              activeRange={activeRange}
              itemList={itemList}
              onItemClick={(event, id) => {
                event.preventDefault();
                pendingHashRef.current = id;
                setIsDrawerOpen(false);
              }}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export { TableOfContents };
