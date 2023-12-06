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
      return supergroup.ownerOf.toLowerCase() === address?.toLowerCase();
    }
    return true;
  });

  const label = (showOwned ? "My " : "") + "Supergroups";

  return (
    <div>
      <Container label={`${label}:`}>
        {filteredSupergroups.length === 0 && <p>No supergroups found.</p>}
        <div className="flex flex-col">
          {filteredSupergroups &&
            filteredSupergroups.map((supergroup) => (
              <SupergroupListItem
                tokenId={supergroup.tokenId}
                key={supergroup.tokenId}
              />
            ))}
        </div>
      </Container>
    </div>
  );
};
