import { Button, Container } from "ui";
import { Artist } from "../../types";
import { PixelatedImage } from "../PixelatedImage";

interface ArtistDisplayProps {
  artists: Artist[];
  removeAtIndex?: (index: number) => void;
}

export const ArtistDisplay = ({
  artists,
  removeAtIndex,
}: ArtistDisplayProps) => {
  return (
    <Container rounded>
      <div className="flex">
        {artists.map((artist, index) => {
          return (
            <div key={artist.id} className="w-48">
              <div className="relative">
                <div className="mx-auto my-2">
                  <PixelatedImage imageUrl={artist.imageUrl} />
                </div>
                {removeAtIndex && (
                  <div className="absolute top-0 left-32">
                    <button
                      className={"nes-btn is-error"}
                      onClick={() => removeAtIndex(index)}
                    >
                      x
                    </button>
                  </div>
                )}
              </div>
              <div className="m-auto text-center w-40">{artist.name}</div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};
