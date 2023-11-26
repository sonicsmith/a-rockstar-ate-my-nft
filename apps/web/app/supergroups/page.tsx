import { CreateSupergroup } from "../components/CreateSupergroup";
import { SupergroupList } from "../components/SupergroupList";

export default function Page({
  searchParams,
}: {
  searchParams: { action: string | string[] | undefined };
}) {
  if (searchParams?.action === "create") {
    return <CreateSupergroup />;
  }

  return <SupergroupList />;
}
