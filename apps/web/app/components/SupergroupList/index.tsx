"use client";

import { Container } from "ui";
import { useAccount } from "wagmi";
import type { SupergroupsNftItem } from "../../types";
import { SupergroupListItem } from "./SupergroupListItem";

export function SupergroupList({
  supergroups,
  showOwned,
}: {
  supergroups: SupergroupsNftItem[];
  showOwned: boolean;
}) {
  const { address } = useAccount();

  const filteredSupergroups = supergroups.filter((supergroup) => {
    if (showOwned) {
      return supergroup.ownerOf.toLowerCase() === address?.toLowerCase();
    }
    return true;
  });

  const label = `${showOwned ? "My " : ""  }Supergroups`;

  return (
    <div>
      <Container label={`${label}:`}>
        {filteredSupergroups.length === 0 && <p>No supergroups found.</p>}
        <div className="flex flex-col">
          {filteredSupergroups ? filteredSupergroups.map((supergroup) => (
              <SupergroupListItem
                key={supergroup.tokenId}
                tokenId={supergroup.tokenId}
              />
            )) : null}
        </div>
      </Container>
    </div>
  );
}
