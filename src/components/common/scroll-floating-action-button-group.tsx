'use client';

import type { ComponentProps } from 'react';

import { ArrowDown, ArrowUp } from 'lucide-react';

import { cn } from '@/utils';

import { Button, Separator } from '../ui';

type ScrollFloatingActionButtonGroupProps = ComponentProps<'div'>;

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
        type="button"
        title="맨 위로 이동"
        size="icon"
        aria-label="맨 위로 이동"
        onClick={handleScrollToTopButtonClick}
        className="rounded-b-none"
      >
        <ArrowUp />
      </Button>
      <Separator />
      <Button
        type="button"
        title="맨 아래로 이동"
        size="icon"
        aria-label="맨 아래로 이동"
        onClick={handleScrollToBottomButtonClick}
        className="rounded-t-none"
      >
        <ArrowDown />
      </Button>
    </div>
  );
}

export { ScrollFloatingActionButtonGroup };
