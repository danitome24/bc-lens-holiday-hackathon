import { Tx, WalletScore } from "@/types";
import { type NextRequest } from "next/server";
import { format, parse } from "date-fns";
import { calculateScore } from "@/utils/calculateScore";
import { publicClient } from "@/services/publicClient";

const fetchTransactions = async (wallet: `0x${string}`) => {
  const apiUrl = `https://block-explorer-api.staging.lens.dev/api?module=account&offset=1000&action=txlist&sort=asc&endblock=99999999&startblock=0&address=${wallet}`;
  const response = await fetch(apiUrl);
  const txData = await response.json();
  const transactions = txData.result.map(
    (tx: { timeStamp: number; from: string; to: string }) => ({
      timestamp: tx.timeStamp,
      from: tx.from,
      to: tx.to,
    })
  );

  return transactions;
};

const getMonthsWithAnyTx = (transactions: Tx[]): number => {
  const txByMonth: { [key: string]: number } = {};
  transactions.forEach((tx: Tx) => {
    const date = parse(tx.timestamp.toString(), "t", new Date());
    const month = format(date, "yyyy-MM");
    if (!txByMonth[month]) {
      txByMonth[month] = 0;
    }
    txByMonth[month]++;
  });

  // Count the number of months with at least one transaction
  return Object.keys(txByMonth).length;
};

const getUniqueProtocolsInteractedWith = (
  transactions: Tx[],
  wallet: `0x${string}`
): number => {
  const uniqueContracts = new Set<string>();

  for (const tx of transactions) {
    if (tx.to && tx.to !== wallet && wallet == tx.from) {
      uniqueContracts.add(tx.to);
    }
  }

  return uniqueContracts.size;
};

const fetchWalletAge = async (wallet: `0x${string}`): Promise<number> => {
  const apiUrl = `https://block-explorer-api.staging.lens.dev/api?module=account&action=txlist&page=1&offset=1&sort=asc&endblock=99999999&startblock=0&address=${wallet}`;
  const response = await fetch(apiUrl);
  const firstTransaction = await response.json();

  if (firstTransaction.result.length == 0) {
    return 0;
  }

  const firstTxTimestampDate = new Date(
    firstTransaction.result[0].timeStamp * 1000
  );

  const now = new Date();
  const diffInMonths =
    (now.getFullYear() - firstTxTimestampDate.getFullYear()) * 12 +
    (now.getMonth() - firstTxTimestampDate.getMonth()) +
    1;

  /*const years = Math.floor(diffInMonths / 12);
    const months = diffInMonths % 12;*/

  return diffInMonths;
};

const fetchWalletBalance = async (wallet: `0x${string}`) => {
  const balance = await publicClient.getBalance({
    address: wallet,
  });

  return Number(balance) / 1e18;
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const wallet = searchParams.get("wallet") as `0x${string}`;
  if (!wallet) {
    return new Response("Wallet missing", {
      status: 400,
    });
  }

  // Fetch all data from wallet.
  const transactions = await fetchTransactions(wallet);
  const walletAge = await fetchWalletAge(wallet);
  const monthsWithAnyTx = getMonthsWithAnyTx(transactions);
  const uniqueProtocolsInteractedWith = getUniqueProtocolsInteractedWith(
    transactions,
    wallet
  );
  const walletBalance = await fetchWalletBalance(wallet);

  // Calculate score from all fetched data.
  const score = calculateScore({
    transactions: transactions.length,
    accountAgeMonths: walletAge,
    protocolsUsed: uniqueProtocolsInteractedWith,
    monthsInteracting: monthsWithAnyTx,
    grassBalance: walletBalance,
  });

  const walletData: WalletScore = {
    total: score.total,
    transactionsScore: score.txScore,
    walletAgeScore: score.accAgeScore,
    uniqueProtocolsScore: score.protocolsScore,
    engagementScore: score.monthsInteractingScore,
    balanceScore: score.grassBalanceScore,
  };

  return Response.json({
    score: walletData,
    wallet: wallet,
  });
}
