"use client";

import { useReadContract } from "wagmi";
import { abi, contractAddress } from "@/abis/LensScoreSBT.info";
import { useEffect, useState } from "react";

type DisplayNFTProps = {
  walletAddress: string;
};

export const DisplayNFT = ({ walletAddress }: DisplayNFTProps) => {
  const [nftURI, setNftUri] = useState<string>("");

  const { data: tokenId } = useReadContract({
    abi,
    address: contractAddress,
    functionName: "getTokenIdByAddress",
    args: [walletAddress],
  });
  const { data: tokenUri } = useReadContract({
    abi,
    address: contractAddress,
    functionName: "tokenURI",
    args: [tokenId],
  }) as { data: string };

  useEffect(() => {
    if ((tokenUri) != undefined) {
      const base64NoHeaders = tokenUri.replace(/^data:.+;base64,/, "");
      const jsonTokenUri = atob(base64NoHeaders);

      setNftUri(jsonTokenUri);
    }
  }, [tokenUri]);

  return <p className="text-wrap">{nftURI}</p>;
};
