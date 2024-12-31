import { useCallback, useEffect, useState } from "react";
import { publicClient } from "@/services/publicClient";
import { contractAddress, abi } from "@/abis/LensScoreSBT.info";
import { useAccount } from "wagmi";

export const useFetchSBTMinted = (): {
  isMinted: boolean;
  isLoading: boolean;
} => {
  const [hasMintedNft, setHasMintedNft] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const account = useAccount();

  const checkIfNFTisMinted = useCallback(async () => {
    const logs = await publicClient.getContractEvents({
      address: contractAddress,
      abi,
      eventName: "LensScoreSBTMinted",
      args: {
        by: account.address,
      },
      fromBlock: BigInt(100237),
    });

    if (logs.length > 0) {
      setHasMintedNft(true);
    }  
  }, [account.address]);

  useEffect(() => {
    if (account.address != undefined) {
      setIsLoading(true);
      checkIfNFTisMinted();
      setIsLoading(false);
    }
  }, [account.address, checkIfNFTisMinted]);

  return { isMinted: hasMintedNft, isLoading };
};
