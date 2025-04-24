
'use client';

import {useState, useEffect} from 'react';
import {Button} from '@/components/ui/button';
import {getMetamaskAccount, MetamaskAccount} from '@/services/metamask';

export function MetamaskAuthentication() {
  const [account, setAccount] = useState<MetamaskAccount | null>(null);

  useEffect(() => {
    async function fetchAccount() {
      const metamaskAccount = await getMetamaskAccount();
      setAccount(metamaskAccount);
    }

    fetchAccount();
  }, []);

  async function connectMetamask() {
    // TODO: Implement Metamask connection logic here
    const metamaskAccount = await getMetamaskAccount();
    setAccount(metamaskAccount);
    alert('Connecting to Metamask...');
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {account ? (
        <div>
          <p className="text-sm">
            Connected with Metamask:
            <br />
            <span className="font-bold">{account.address}</span>
          </p>
        </div>
      ) : (
        <Button onClick={connectMetamask} className="bg-accent text-accent-foreground">
          Connect to Metamask
        </Button>
      )}
    </div>
  );
}
