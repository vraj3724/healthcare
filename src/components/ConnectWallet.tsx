"use client";

declare global {
  interface Window { ethereum: any; }
}

import React, { useState, useEffect } from 'react';

interface Props {
  onConnect: () => void; // Function passed from parent
}

const ConnectWallet: React.FC<Props> = ({ onConnect }) => { // Destructure onConnect from props
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setIsConnected(true);
            setAccount(accounts[0]);
            onConnect(); // Notify parent if already connected
          }
        } catch (err) {
          setError('Failed to check connection.');
          console.error(err)
        }
      }
    };
    checkConnection();
  }, [onConnect]); // Add onConnect to dependency array

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setIsConnected(true);
        setAccount(accounts[0]);
        onConnect(); // Call the passed function on successful connection
        setError(null);
      } catch (err) {
        setError('Failed to connect to MetaMask.');
        console.error(err)
      }
    } else {
      setError('MetaMask is not installed!');
    }
  };

  return (
    <div>
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      {isConnected ? (
        <div>
          Connected: {account}
        </div>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default ConnectWallet;
