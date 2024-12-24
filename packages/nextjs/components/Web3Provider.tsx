"use client";

import { WagmiProvider, createConfig, http } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { lensTestnet } from "@/services/customChains";
import { polygon } from "wagmi/chains";
import { LensConfig, LensProvider, production } from "@lens-protocol/react-web";
import { bindings } from "@lens-protocol/wagmi";

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [lensTestnet],
    transports: {
      // RPC URL for each chain
      [lensTestnet.id]: http(lensTestnet.rpcUrls.default.http[0]),
    },

    // Required API Keys
    walletConnectProjectId:
      process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",

    // Required App Info
    appName: "Lens Social Score",

    // Optional App Info
    appDescription:
      "Reputation system for users based on their activity and engagement within the network",
    appUrl: "https://bc-lens-holiday-hackathon.vercel.app/", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);

const polygonConfig = createConfig({
  chains: [polygon],
  transports: {
    [polygon.id]: http(polygon.rpcUrls.default.http[0]),
  },
});

const queryClient = new QueryClient();

const lensConfig: LensConfig = {
  environment: production,
  bindings: bindings(polygonConfig),
};

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <LensProvider config={lensConfig}>
          <ConnectKitProvider>{children}</ConnectKitProvider>
        </LensProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
