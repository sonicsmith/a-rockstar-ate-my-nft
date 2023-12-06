import { getSupergroups } from "../../api/supergroups";
import { SupergroupList } from "../components/SupergroupList";
import { CreateSupergroup } from "../components/CreateSupergroup";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    action: string | string[] | undefined;
    filter: string | string[] | undefined;
  };
}) {
  const supergroups = await getSupergroups();

  if (searchParams.action === "create") {
    return <CreateSupergroup />;
  }

  return (
    <SupergroupList
      showOwned={searchParams.filter === "owned"}
      supergroups={supergroups}
    />
  );
}
