'use client';

import type { ComponentProps } from 'react';

import { ArrowDown, ArrowUp } from 'lucide-react';

import { Button } from './button';
import { ButtonGroup, ButtonGroupSeparator } from './button-group';

type ScrollFloatingActionButtonGroupProps = ComponentProps<typeof ButtonGroup>;

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

  return (
    <ButtonGroup orientation="vertical" className={className} {...props}>
      <Button
        type="button"
        size="icon"
        title="맨 위로 이동"
        aria-label="맨 위로 이동"
        onClick={() => {
          scrollTo('top');
        }}
      >
        <ArrowUp aria-hidden="true" />
      </Button>
      <ButtonGroupSeparator orientation="horizontal" className="bg-muted" />
      <Button
        type="button"
        size="icon"
        title="맨 아래로 이동"
        aria-label="맨 아래로 이동"
        onClick={() => {
          scrollTo('bottom');
        }}
      >
        <ArrowDown aria-hidden="true" />
      </Button>
    </ButtonGroup>
  );
}

export { ScrollFloatingActionButtonGroup };
