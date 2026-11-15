'use client';

import { type MouseEvent, useEffect, useRef, useState } from 'react';

import { Check, Clipboard } from 'lucide-react';

import { Button } from '@/shared/components';

const COPIED_DURATION = 1500;

function CodeCopyButton() {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<number>(undefined);

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  const handleClick = async ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
    const code = currentTarget.closest('figure')?.querySelector('code')?.textContent ?? '';

    try {
      await navigator.clipboard.writeText(code);
    } catch {
      return;
    }

    setIsCopied(true);
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setIsCopied(false), COPIED_DURATION);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-live="polite"
      className="text-muted-foreground absolute top-3 right-2 size-7 backdrop-blur-lg"
      onClick={handleClick}
    >
      {isCopied ? (
        <Check className="text-primary motion-safe:animate-pop-in" />
      ) : (
        <Clipboard className="motion-safe:animate-pop-in" />
      )}
      <span className="sr-only">{isCopied ? '복사했어요' : '코드 복사하기'}</span>
    </Button>
  );
}

export { CodeCopyButton };
