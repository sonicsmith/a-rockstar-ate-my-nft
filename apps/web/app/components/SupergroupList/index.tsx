"use client";

import { Container } from "ui";
import { SupergroupListItem } from "./SupergroupListItem";
import { SupergroupsNftItem } from "../../types";
import { useAccount } from "wagmi";

export const SupergroupList = ({
  supergroups,
  showOwned,
}: {
  supergroups: SupergroupsNftItem[];
  showOwned: boolean;
}) => {
  const { address } = useAccount();

  const filteredSupergroups = supergroups.filter((supergroup) => {
    if (showOwned) {
      return true;
    }
    return supergroup.ownerOf === address;
  });

  return (
    <div>
      <Container label={"Supergroups:"}>
        {filteredSupergroups.length === 0 && <p>No supergroups found.</p>}
        {filteredSupergroups &&
          filteredSupergroups.map((supergroup) => (
            <SupergroupListItem
              tokenId={supergroup.tokenId}
              key={supergroup.tokenId}
            />
          ))}
      </Container>
    </div>
  );
};
