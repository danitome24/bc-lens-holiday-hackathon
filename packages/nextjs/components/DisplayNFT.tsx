"use client";

import { useReadContract } from "wagmi";
import { abi, contractAddress } from "@/abis/LensScoreSBT.info";
import { useEffect, useState } from "react";
import Image from "next/image";

type DisplayNFTProps = {
  walletAddress: string;
};

type TokenURI = {
  name: string;
  description: string;
  image: string;
  attributes?: Attribute[];
};

type Attribute = {
  trait_type: string;
  value: string | number;
};

export const DisplayNFT = ({ walletAddress }: DisplayNFTProps) => {
  const [nftURI, setNftUri] = useState<TokenURI>();

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
    if (tokenUri != undefined) {
      const base64NoHeaders = tokenUri.replace(/^data:.+;base64,/, "");
      const jsonTokenUri = JSON.parse(atob(base64NoHeaders));

      setNftUri(jsonTokenUri as TokenURI);
    }
  }, [tokenUri]);

  return (
    <>
      {nftURI ? (
        <Image
          className="w-full h-auto max-h-[350px]"
          alt="nft"
          width={200}
          height={350}
          src={`https://aquamarine-accepted-haddock-468.mypinata.cloud/ipfs/${nftURI?.image}`}
          unoptimized={true}
        />
      ) : (
        <></>
      )}
    </>
  );
};
