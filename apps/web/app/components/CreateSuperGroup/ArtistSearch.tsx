"use client";

import { useState } from "react";
import { Button, Input } from "ui";
import { useArtistSearch } from "../../hooks/useArtistSearch";
import { Artist } from "../../types";

interface ArtistSearchProps {
  addArtist: (artist: Artist) => void;
  label: string;
}

export const ArtistSearch = ({ addArtist, label }: ArtistSearchProps) => {
  const [query, setQuery] = useState("");

  const artist = useArtistSearch(query);

  return (
    <div className="flex gap-2 flex-col md:flex-row">
      <div className="w-full">
        <Input
          value={query}
          setValue={setQuery}
          label={label}
          suggestion={artist?.name || ""}
        />
      </div>
      <div className="flex flex-col justify-end">
        <Button
          variant={"success"}
          onClick={() => {
            addArtist(artist!);
            setQuery("");
          }}
          disabled={!artist}
        >
          Add
        </Button>
      </div>
    </div>
  );
};
