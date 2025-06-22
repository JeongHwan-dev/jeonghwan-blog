'use client';

import type { ComponentProps } from 'react';

import { ArrowDown, ArrowUp } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Button, Separator } from '../ui';

interface ScrollFloatingActionButtonGroupProps extends ComponentProps<'div'> {}

type ScrollDirection = 'bottom' | 'top';

function ScrollFloatingActionButtonGroup({
  className,
  ...props
}: ScrollFloatingActionButtonGroupProps) {
  const scrollTo = (direction: ScrollDirection) => {
    window.scrollTo({
      behavior: 'smooth',
      top: direction === 'top' ? 0 : document.documentElement.scrollHeight,
    });
  };

  const handleScrollToTopButtonClick = () => {
    scrollTo('top');
  };

  const handleScrollToBottomButtonClick = () => {
    scrollTo('bottom');
  };

  return (
    <div className={cn('flex flex-col', className)} {...props}>
      <Button
        aria-label="맨 위로 이동"
        className="rounded-b-none"
        onClick={handleScrollToTopButtonClick}
        size="icon"
        title="맨 위로 이동"
        type="button"
      >
        <ArrowUp />
      </Button>
      <Separator />
      <Button
        aria-label="맨 아래로 이동"
        className="rounded-t-none"
        onClick={handleScrollToBottomButtonClick}
        size="icon"
        title="맨 아래로 이동"
        type="button"
      >
        <ArrowDown />
      </Button>
    </div>
  );
}

export { ScrollFloatingActionButtonGroup };
