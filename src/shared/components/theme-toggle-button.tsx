'use client';

import type { PropsWithChildren } from 'react';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from './button';

type ThemeToggleButtonProps = PropsWithChildren;

function ThemeToggleButton(props: ThemeToggleButtonProps) {
  const { setTheme, theme } = useTheme();

  const handleThemeToggleButtonClick = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      aria-label="테마 변경"
      onClick={handleThemeToggleButtonClick}
      {...props}
    >
      <Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}

export { ThemeToggleButton };
