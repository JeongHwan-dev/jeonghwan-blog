'use client';

import type { ComponentProps } from 'react';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

type ThemeProviderProps = ComponentProps<typeof NextThemesProvider>;

function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}

export { ThemeProvider };
