import { useRoyaltiesBalance } from "../../hooks/useRoyaltiesBalance";

export const RoyaltiesBalance = () => {
  const balance = useRoyaltiesBalance();

  return (
    <div className="flex mx-4">
      <div className="m-auto">
        <i className="nes-icon coin"></i>
      </div>
      <div className="m-auto">x{Number(balance).toLocaleString()}</div>
    </div>
  );
};
