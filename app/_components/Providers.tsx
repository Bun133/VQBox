"use client"

import { Provider } from "@/components/ui/provider";
import { Theme } from "@chakra-ui/react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConvexProvider client={convex}>
      <Provider>
        <Theme appearance='light'>
          {children}
        </Theme>
      </Provider>
    </ConvexProvider>
  );
}