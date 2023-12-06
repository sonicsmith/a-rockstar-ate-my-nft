import { getSupergroups } from "../../api/supergroups";
import { CreateSupergroup } from "./../components/CreateSupergroup";
import { SupergroupList } from "./../components/SupergroupList";

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
      supergroups={supergroups}
      showOwned={searchParams.filter === "owned"}
    />
  );
}
