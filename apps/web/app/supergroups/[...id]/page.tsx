import { ViewSupergroup } from "../../components/ViewSupergroup";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  return <ViewSupergroup tokenId={id} />;
}
