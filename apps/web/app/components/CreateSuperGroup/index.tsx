"use client";

import { useState } from "react";
import { Button, Container } from "ui";
import { Artist } from "../../types";
import { ArtistSearch } from "./ArtistSearch";
import { ArtistDisplay } from "./ArtistsDisplay";

export const CreateSuperGroup = () => {
  const [artists, setArtists] = useState<Artist[]>([]);

  const addArtist = (artist: Artist) => {
    console.log("addArtist", artist);
    if (artist) {
      setArtists([...artists, artist]);
    }
  };

  const removeArtistAtIndex = (index: number) => {
    setArtists(artists.filter((_, i) => i !== index));
  };

  return (
    <Container label={"Create Super Group"}>
      {artists.length ? (
        <ArtistDisplay artists={artists} removeAtIndex={removeArtistAtIndex} />
      ) : null}
      {artists.length < 2 ? (
        <ArtistSearch
          label={`Search ${artists.length ? "second" : "first"} artist:`}
          addArtist={addArtist}
        />
      ) : (
        <div className="flex justify-center">
          <Button variant="success">
            <div className="flex gap-2">
              <div className="my-auto">Create Super Group</div>
            </div>
          </Button>
        </div>
      )}
    </Container>
  );
};
