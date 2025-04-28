"use client";

import React from "react";
import FetchAllRecords from "@/components/FetchAllRecords"; // ✅ Only Fetch All
import ConnectWallet from "@/components/ConnectWallet";

const onConnectDefault = () => {
  console.log("Wallet connected");
};

export default function AllRecordsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-12 lg:p-24 space-y-8">
      <h1 className="text-3xl font-bold">All Patient Records</h1>

      <div className="w-full max-w-md">
        <ConnectWallet onConnect={onConnectDefault} />
      </div>

      <div className="w-full max-w-4xl mt-8">
        <FetchAllRecords /> {/* ✅ Only Fetch All button */}
      </div>
    </main>
  );
}
