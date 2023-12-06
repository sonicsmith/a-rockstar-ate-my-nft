import Link from "next/link";

export function HomeButton() {
  return (
    <Link className="" href="/">
      <svg height="50" width="50" xmlns="http://www.w3.org/2000/svg">
        <rect fill="white" height="2.5" width="5" x="22.5" y="5" />
        <rect fill="white" height="2.5" width="10" x="20" y="7.5" />
        <rect fill="white" height="2.5" width="15" x="17.5" y="10" />
        <rect fill="white" height="2.5" width="20" x="15" y="12.5" />
        <rect fill="white" height="2.5" width="25" x="12.5" y="15" />
        <rect fill="white" height="2.5" width="30" x="10" y="17.5" />
        <rect fill="white" height="2.5" width="35" x="7.5" y="20" />
        <rect fill="white" height="20" width="25" x="12.5" y="22.5" />
        <rect fill="black" height="20" width="10" x="20" y="30" />
      </svg>
    </Link>
  );
}
