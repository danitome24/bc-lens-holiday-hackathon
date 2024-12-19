"use client";

import { WagmiProvider, createConfig, http } from "wagmi";
import { chains } from "@lens-network/sdk/viem";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [chains.testnet],
    transports: {
      // RPC URL for each chain
      [chains.testnet.id]: http("https://rpc.testnet.lens.network"),
    },

    // Required API Keys
    walletConnectProjectId:
      process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",

    // Required App Info
    appName: "Lens Social Score",

    // Optional App Info
    appDescription: "Reputation system for users based on their activity and engagement within the network",
    appUrl: "https://bc-lens-holiday-hackathon.vercel.app/", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
