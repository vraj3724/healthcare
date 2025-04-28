"use client";

import { WagmiProvider, http } from 'wagmi';
import { createConfig } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(), // Public HTTP provider
  },
  ssr: true, // Optional: agar server-side rendering kar rahe ho
});

const queryClient = new QueryClient();

export function WagmiContextProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
