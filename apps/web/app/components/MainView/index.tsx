"use client";

import { useAccount } from "wagmi";

export function MainView({ children }: { children: React.ReactNode }) {
  const { isConnected } = useAccount();

  if (isConnected) {
    return <div>{children}</div>;
  }
  return <div>Please connect wallet to continue</div>;
}
