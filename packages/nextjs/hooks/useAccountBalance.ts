import { useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";

export const useAccountBalance = (walletAddress: string) => {
  const [balance, setBalance] = useState<number>(0);
  const [balanceWithDecimals, setBalanceWithDecimals] = useState<number>(0);

  const { data, isError, isLoading } = useBalance({
    address: walletAddress as `0x${string}`,
  });

  useEffect(() => {
    if (data) {
      setBalance(Number(data.value));
      setBalanceWithDecimals(Number(data.value) / 10 ** data.decimals);
    }
  }, [data]);

  return {
    balance,
    balanceWithDecimals,
    isError,
    isLoading,
  };
};
