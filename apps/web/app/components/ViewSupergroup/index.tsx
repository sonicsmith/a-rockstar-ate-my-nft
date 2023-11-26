"use client";

import { Container } from "ui";
import { useSupergroupInfo } from "../../hooks/useSupergroupInfo";

export const ViewSupergroup = ({ tokenId }: { tokenId: string }) => {
  const { artistIds, followers } = useSupergroupInfo(tokenId);

  return <Container label="Supergroup:"> {tokenId}</Container>;
};
