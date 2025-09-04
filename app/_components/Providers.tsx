'use client';

import { Provider } from '@/components/ui/provider';
import { Theme } from '@chakra-ui/react';
import { ConvexAuthNextjsProvider } from '@convex-dev/auth/nextjs';
import { ConvexReactClient } from 'convex/react';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConvexAuthNextjsProvider client={convex}>
      <Provider>
        <Theme appearance="light">{children}</Theme>
      </Provider>
    </ConvexAuthNextjsProvider>
  );
};
