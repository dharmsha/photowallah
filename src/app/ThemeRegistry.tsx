'use client';

import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { CssBaseline } from '@mui/material';

const muiCache = createCache({
  key: 'mui',
  prepend: true,
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider value={muiCache}>
      <CssBaseline />
      {children}
    </CacheProvider>
  );
}
