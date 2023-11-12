"use client";

import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import { ReactNode, useEffect, useState } from "react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygon, polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygon, polygonMumbai],
  [publicProvider()],
);

const projectId = process.env.NEXT_PUBLIC_RAINBOW_PROJECT_ID!;

const appInfo = {
  appName: "A Rockstar Ate My NFT",
};

const { wallets } = getDefaultWallets({
  ...appInfo,
  projectId,
  chains,
});

const connectors = connectorsForWallets(wallets);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} appInfo={appInfo}>
        <QueryClientProvider client={queryClient}>
          {mounted && children}
        </QueryClientProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
