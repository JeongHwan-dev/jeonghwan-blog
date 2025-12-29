'use client';

import type { PropsWithChildren } from 'react';

import { TanstackQueryProvider, ThemeProvider } from '@/shared/providers';

type ProvidersProps = PropsWithChildren;

function Providers({ children }: ProvidersProps) {
  return (
    <TanstackQueryProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </TanstackQueryProvider>
  );
}

export { Providers };
