import Link from "next/link";

export const SupergroupListItem = (props: { tokenId: string }) => {
  return (
    <Link href={`/supergroups/${props.tokenId}`}>
      <div className="nes-badge">
        <span className="is-dark">Token: {props.tokenId}</span>
      </div>
    </Link>
  );
};
