"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Link to navigate
import ConnectWallet from '@/components/ConnectWallet'; // Wallet connect button

export default function Home() {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const handleConnect = () => {
    setIsConnected(true);
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      (window as any).ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            console.log("Wallet already connected with account:", accounts[0]);
            handleConnect();
          }
        })
        .catch((error: any) => {
          console.error('Error checking existing accounts:', error);
        });
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 md:p-12 lg:p-24 space-y-8 bg-gradient-to-r from-purple-300 via-blue-200 to-pink-200">
      <h1 className="text-4xl font-bold mb-6">🏥 Welcome to HealthChain</h1>

      <div className="w-full max-w-md flex flex-col items-center space-y-6">
        <ConnectWallet onConnect={handleConnect} />
        
        {isConnected && (
          <Link href="/dashboard">
            <button className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition">
              Go to Dashboard
            </button>
          </Link>
        )}
      </div>

      {!isConnected && (
        <div className="mt-8 text-center">
          <p className="text-gray-700">Please connect your MetaMask wallet to continue.</p>
        </div>
      )}
    </main>
  );
}
