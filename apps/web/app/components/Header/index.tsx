import { ConnectButton } from "@rainbow-me/rainbowkit";

export const Header = () => {
  return (
    <nav className="bg-black w-full flex sticky top-0 text-white p-4 justify-between">
      <div className="m-auto">A Rockstar Ate My NFT</div>
      <div className="m-auto">
        <ConnectButton />
      </div>
    </nav>
  );
};
