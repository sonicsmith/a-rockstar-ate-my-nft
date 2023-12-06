import Link from "next/link";

export function SupergroupListItem(props: { tokenId: string }) {
  return (
    <Link href={`/supergroups/${props.tokenId}`}>
      <div className="nes-badge">
        <span className="is-dark">Token: {props.tokenId}</span>
      </div>
    </Link>
  );
}
