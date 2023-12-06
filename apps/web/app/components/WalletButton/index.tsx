import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "ui";

export function WalletButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        if (chain?.unsupported) {
          return <Button onClick={openChainModal}>Wrong network</Button>;
        }

        if (connected) {
          return (
            <Button onClick={openAccountModal}>{account.displayName}</Button>
          );
        }

        return <Button onClick={openConnectModal}>Connect Wallet</Button>;
      }}
    </ConnectButton.Custom>
  );
}
