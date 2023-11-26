"use client";

import { MenuButton } from "../MenuButton";
import { WalletButton } from "../WalletButton";

export const Header = () => {
  return (
    <nav className="bg-black w-full flex sticky top-0 text-white p-4 justify-between">
      <div className="my-auto">
        <MenuButton />
      </div>
      <div className="my-auto">
        <WalletButton />
      </div>
    </nav>
  );
};
