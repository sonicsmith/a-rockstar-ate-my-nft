"use client";

import { useEffect, useState } from "react";
import { Button, Container } from "ui";
import { Artist } from "../../types";
import { ArtistDisplay } from "../ArtistDisplay";
import { useCreateSupergroup } from "../../hooks/useCreateSupergroup";
import { useRouter } from "next/navigation";
import { useAppStore } from "../../store/useAppStore";
import { ArtistSearch } from "./ArtistSearch";

export const CreateSupergroup = () => {
  const [artists, setArtists] = useState<Artist[]>([]);

  const { createSupergroup, data, isLoading, isSuccess } =
    useCreateSupergroup();

  const router = useRouter();

  const { setDialogMessage } = useAppStore();

  const addArtist = (artist: Artist) => {
    if (artist) {
      setArtists([...artists, artist]);
    }
  };

  const removeArtistAtIndex = (index: number) => {
    setArtists(artists.filter((_, i) => i !== index));
  };

  const create = async () => {
    if (!isLoading && artists.length === 2) {
      const artistIds = [artists[0].id, artists[1].id];
      createSupergroup(artistIds);
    }
  };

  useEffect(() => {
    if (data?.hash) {
      // This has is the request transaction
      setDialogMessage(
        "Transaction processing. You should receive your NFT soon!",
      );
      router.push(`/?hash=${data.hash}`);
    }
  }, [data]);

  return (
    <div>
      <Container label={"Create Super Group"}>
        {artists.length ? (
          <div className="mb-4">
            <ArtistDisplay
              artists={artists}
              removeAtIndex={removeArtistAtIndex}
            />
          </div>
        ) : null}
        {artists.length < 2 ? (
          <ArtistSearch
            label={`Search ${artists.length ? "second" : "first"} artist:`}
            addArtist={addArtist}
          />
        ) : (
          <div className="flex justify-center">
            <Button
              variant={isLoading ? "warning" : "success"}
              onClick={create}
            >
              <div className="flex gap-2">
                {isLoading ? (
                  <div className="my-auto animate-pulse">Creating...</div>
                ) : (
                  <div className="my-auto">Create Super Group</div>
                )}
              </div>
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};
