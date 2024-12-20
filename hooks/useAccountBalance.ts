import { useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";

export const useAccountBalance = () => {
  const [balance, setBalance] = useState<number>(0);
  const [balanceWithDecimals, setBalanceWithDecimals] = useState<number>(0);

  const { address } = useAccount();
  const { data, isError, isLoading } = useBalance({
    address: address as `0x${string}`,
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
