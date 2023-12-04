"use client";

import { useAccount } from "wagmi";
import { HomeButton } from "../HomeButton";
import { RoyaltiesBalance } from "../RoyaltiesBalance";
import { WalletButton } from "../WalletButton";

export const Header = () => {
  const { isConnected } = useAccount();
  return (
    <nav className="bg-black w-full flex sticky top-0 text-white p-4 justify-between">
      <div className="my-auto">
        <HomeButton />
      </div>
      <div className="my-auto flex">
        {isConnected && <RoyaltiesBalance />}
        <WalletButton />
      </div>
    </nav>
  );
};
