import { CreateSuperGroup } from "../components/CreateSuperGroup";

export default function Page({
  searchParams,
}: {
  searchParams: { action: string | string[] | undefined };
}) {
  if (searchParams?.action === "create") {
    return <CreateSuperGroup />;
  }

  return <div>All Super groups</div>;
}
