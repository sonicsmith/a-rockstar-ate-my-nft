import { Container } from "ui";
import { getSupergroups } from "../../../api/supergroups";
import { SupergroupListItem } from "./SupergroupListItem";

export const SupergroupList = async ({ filter }: { filter?: string }) => {
  const supergroups = await getSupergroups();

  return (
    <div>
      <Container label={"Supergroups:"}>
        {supergroups.length === 0 && <p>No supergroups found.</p>}
        {supergroups &&
          supergroups.map((supergroup) => (
            <SupergroupListItem
              tokenId={supergroup.tokenId}
              key={supergroup.tokenId}
            />
          ))}
      </Container>
    </div>
  );
};
