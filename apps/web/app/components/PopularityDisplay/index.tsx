const DownArrow = () => {
  return (
    <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="4" x="3" y="8" fill="red" />
      <rect width="16" height="4" x="7" y="12" fill="red" />
      <rect width="12" height="4" x="9" y="16" fill="red" />
      <rect width="4" height="4" x="13" y="20" fill="red" />
    </svg>
  );
};

const UpArrow = () => {
  return (
    <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="4" x="3" y="18" fill="green" />
      <rect width="16" height="4" x="7" y="14" fill="green" />
      <rect width="12" height="4" x="9" y="10" fill="green" />
      <rect width="4" height="4" x="13" y="6" fill="green" />
    </svg>
  );
};

const Symbol = ({ amount }: { amount: number }) => {
  if (amount === 0) return <></>;
  if (amount > 0)
    return (
      <div className="">
        <UpArrow />
      </div>
    );
  return (
    <div className="">
      <DownArrow />
    </div>
  );
};

export const PopularityDisplay = ({ popularity }: { popularity: number }) => {
  return (
    <div className="flex gap-4">
      <div className="m-auto">Chart Growth: {popularity.toLocaleString()}</div>
      <Symbol amount={popularity} />
    </div>
  );
};
