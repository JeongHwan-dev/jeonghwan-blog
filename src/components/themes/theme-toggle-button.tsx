'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components';

function ThemeToggleButton() {
  const { setTheme, theme } = useTheme();

  const handleThemeToggleButtonClick = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      aria-label="테마 변경"
      onClick={handleThemeToggleButtonClick}
      size="icon"
      variant="ghost"
    >
      <Sun className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </Button>
  );
}

export { ThemeToggleButton };
