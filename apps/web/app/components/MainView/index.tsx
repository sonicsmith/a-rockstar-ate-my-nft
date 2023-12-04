"use client";

import { useAccount } from "wagmi";

export const MainView = ({ children }: { children: React.ReactNode }) => {
  const { isConnected } = useAccount();

  if (isConnected) {
    return <div>{children}</div>;
  } else {
    return <div>Please log in to continue</div>;
  }
};
