function DownArrow() {
  return (
    <svg height="30" width="30" xmlns="http://www.w3.org/2000/svg">
      <rect fill="red" height="4" width="24" x="3" y="8" />
      <rect fill="red" height="4" width="16" x="7" y="12" />
      <rect fill="red" height="4" width="12" x="9" y="16" />
      <rect fill="red" height="4" width="4" x="13" y="20" />
    </svg>
  );
}

function UpArrow() {
  return (
    <svg height="30" width="30" xmlns="http://www.w3.org/2000/svg">
      <rect fill="green" height="4" width="24" x="3" y="18" />
      <rect fill="green" height="4" width="16" x="7" y="14" />
      <rect fill="green" height="4" width="12" x="9" y="10" />
      <rect fill="green" height="4" width="4" x="13" y="6" />
    </svg>
  );
}

function Symbol({ amount }: { amount: number }) {
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
}

export function PopularityDisplay({ popularity }: { popularity: number }) {
  return (
    <div className="flex gap-4">
      <div className="m-auto">Chart Growth: {popularity.toLocaleString()}</div>
      <Symbol amount={popularity} />
    </div>
  );
}
