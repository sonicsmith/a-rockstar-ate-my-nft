"use client";

import { Button, Container } from "ui";
import { useSupergroupInfo } from "../../hooks/useSupergroupInfo";
import { ArtistDisplay } from "../ArtistDisplay";
import { PopularityDisplay } from "../PopularityDisplay";

export const ViewSupergroup = ({ tokenId }: { tokenId: string }) => {
  const { artists, numberOfFollowersStart, numberOfFollowersCurrent } =
    useSupergroupInfo(tokenId);
  if (artists.length < 2) {
    return <Container label="Supergroup:">LOADING</Container>;
  }

  const popularity = numberOfFollowersCurrent - Number(numberOfFollowersStart);

  const sellSupergroup = async () => {};

  return (
    <Container label="Supergroup:">
      <ArtistDisplay artists={artists} />
      <div className="">
        <div className="p-4 w-fit m-auto">
          <PopularityDisplay popularity={popularity} />
        </div>
        <div className="w-fit m-auto">
          <Button onClick={sellSupergroup} variant="success">
            SELL
          </Button>
        </div>
      </div>
    </Container>
  );
};
