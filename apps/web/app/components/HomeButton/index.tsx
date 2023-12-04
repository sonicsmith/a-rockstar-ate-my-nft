import Link from "next/link";

export const HomeButton = () => {
  return (
    <Link href={"/"} className="">
      <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
        <rect width="5" height="2.5" x="22.5" y="5" fill="white" />
        <rect width="10" height="2.5" x="20" y="7.5" fill="white" />
        <rect width="15" height="2.5" x="17.5" y="10" fill="white" />
        <rect width="20" height="2.5" x="15" y="12.5" fill="white" />
        <rect width="25" height="2.5" x="12.5" y="15" fill="white" />
        <rect width="30" height="2.5" x="10" y="17.5" fill="white" />
        <rect width="35" height="2.5" x="7.5" y="20" fill="white" />
        <rect width="25" height="20" x="12.5" y="22.5" fill="white" />
        <rect width="10" height="20" x="20" y="30" fill="black" />
      </svg>
    </Link>
  );
};
