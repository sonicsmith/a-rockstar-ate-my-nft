"use client";

import { Button, Container } from "ui";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { useSupergroupInfo } from "../../hooks/useSupergroupInfo";
import { ArtistDisplay } from "../ArtistDisplay";
import { PopularityDisplay } from "../PopularityDisplay";
import { useSellSupergroup } from "../../hooks/useSellSupergroup";
import { useAppStore } from "../../store/useAppStore";

export function ViewSupergroup({ tokenId }: { tokenId: string }) {
  const {
    owner,
    artists,
    numberOfFollowersStart,
    numberOfFollowersCurrent,
    isErrorOwner,
  } = useSupergroupInfo(tokenId);

  const { sellSupergroup, data, isLoading } = useSellSupergroup(tokenId);

  const router = useRouter();

  const { setDialogMessage } = useAppStore();

  const { address } = useAccount();

  useEffect(() => {
    if (data?.hash) {
      // This has is the request transaction
      setDialogMessage(
        "Transaction processing. You should receive your Royalties soon!",
      );
      router.push(`/?hash=${data.hash}`);
    }
  }, [data]);

  if (artists.length < 2) {
    return <Container label="Supergroup:">LOADING</Container>;
  }

  const popularity = numberOfFollowersCurrent - Number(numberOfFollowersStart);

  const sell = async () => {
    if (!isLoading) {
      sellSupergroup();
    }
  };

  return (
    <Container label="Supergroup:">
      <ArtistDisplay artists={artists} />
      <div className="">
        <div className="p-4 w-fit m-auto">
          {isErrorOwner ? (
            <div className="text-center">
              This supergroup has since
              <br />
              disbanded
            </div>
          ) : (
            <PopularityDisplay popularity={popularity} />
          )}
        </div>
        {owner === address && (
          <div className="w-fit m-auto">
            <Button onClick={sell} variant={isLoading ? "warning" : "success"}>
              <div className="flex gap-2">
                {isLoading ? (
                  <div className="m-auto animate-pulse">Selling...</div>
                ) : (
                  <div className="m-auto">Sell</div>
                )}
              </div>
            </Button>
          </div>
        )}
      </div>
    </Container>
  );
}
