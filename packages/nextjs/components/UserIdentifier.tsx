"use client";

import { useOwnedHandles } from "@lens-protocol/react-web";
import { useEffect, useState } from "react";

type UserIdentifierProps = {
  walletAddress: string;
};

export const UserIdentifier = ({ walletAddress }: UserIdentifierProps) => {
  const [lensHandle, setLensHandle] = useState<string>("");

  const { data } = useOwnedHandles({
    for: walletAddress,
  });

  useEffect(() => {
    if (data && data.length > 0) {
      setLensHandle(`@${data[0].localName}`);
    } else {
      setLensHandle(
        `${walletAddress.slice(0, 6)}....${walletAddress.slice(-4)}`
      );
    }
  }, [data, walletAddress]);

  return <p>{lensHandle}</p>;
};
