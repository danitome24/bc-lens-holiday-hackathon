import { useCallback, useEffect, useState } from "react";
import { publicClient } from "@/services/publicClient";
import { contractAddress, abi } from "@/abis/LensScoreSBT.info";
import { useAccount, useReadContract } from "wagmi";

export const useFetchSBTMinted = (): {
  isMinted: boolean;
  isLoading: boolean;
  sbtData: { score: number; timestamp: Date };
} => {
  const [hasMintedNft, setHasMintedNft] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sbtData, setSbtData] = useState<{
    score: number;
    timestamp: Date;
  }>({ score: 0, timestamp: new Date(0) });

  const account = useAccount();

  const scoreFromSBT = useReadContract({
    abi,
    address: contractAddress,
    functionName: "getScoreByAddress",
    args: [account.address],
  }) as { data: { score: string; timestamp: string } };

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

    if (scoreFromSBT.data != undefined) {
      setSbtData({
        score: Number(scoreFromSBT.data.score),
        timestamp: new Date(Number(scoreFromSBT.data.timestamp) * 1000),
      });
    }
  }, [account.address, checkIfNFTisMinted, scoreFromSBT.data]);

  return { isMinted: hasMintedNft, isLoading, sbtData };
};
