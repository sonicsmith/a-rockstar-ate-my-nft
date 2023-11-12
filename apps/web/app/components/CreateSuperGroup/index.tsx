"use client";

import { useState } from "react";
import { Button, Container, Input } from "ui";
import { useArtistSearch } from "../../hooks/useArtistSearch";

export const CreateSuperGroup = () => {
  const [query, setQuery] = useState("");
  const [artists, setArtists] = useState([]);

  const artistName = useArtistSearch(query);

  console.log(artistName);

  return (
    <Container label={"Create Super Group"}>
      <div className="flex gap-2">
        <div className="w-full">
          <Input
            value={query}
            setValue={setQuery}
            label="Search first artist:"
            suggestion={artistName}
          />
        </div>
        <div className="flex flex-col justify-end">
          <Button variant={"success"} onClick={() => {}} disabled={!artistName}>
            Add
          </Button>
        </div>
      </div>
    </Container>
  );
};
