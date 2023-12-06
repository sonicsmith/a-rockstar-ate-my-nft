"use client";

import { useState } from "react";
import { Button, Input } from "ui";
import { useArtistSearch } from "../../hooks/useArtistSearch";
import type { Artist } from "../../types";

interface ArtistSearchProps {
  addArtist: (artist: Artist) => void;
  label: string;
}

export function ArtistSearch({ addArtist, label }: ArtistSearchProps) {
  const [query, setQuery] = useState("");

  const artist = useArtistSearch(query);

  return (
    <div className="flex gap-2 flex-col md:flex-row">
      <div className="w-full">
        <Input
          label={label}
          setValue={setQuery}
          suggestion={artist?.name || ""}
          value={query}
        />
      </div>
      <div className="flex flex-col justify-end">
        <Button
          disabled={!artist}
          onClick={() => {
            addArtist(artist!);
            setQuery("");
          }}
          variant="success"
        >
          Add
        </Button>
      </div>
    </div>
  );
}
