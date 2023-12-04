import { ViewSupergroup } from "../../components/ViewSupergroup";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const tokenId = id[0];
  return <ViewSupergroup tokenId={tokenId} />;
}
