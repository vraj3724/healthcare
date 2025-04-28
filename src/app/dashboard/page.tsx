"use client";

import React, { useState } from "react";
import FetchRecords from "@/components/FetchRecords";
import FetchAllRecords from "@/components/FetchAllRecords";
import EHRForm from "@/components/EHRForm"; // ✅ Your Add Record Form
import ConnectWallet from "@/components/ConnectWallet"; // Wallet Connect button

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<"home" | "fetchById" | "fetchAll" | "addRecord">("home"); // ✅ Default Home

  const renderContent = () => {
    switch (activeTab) {
      case "fetchById":
        return <FetchRecords />;
      case "fetchAll":
        return <FetchAllRecords />;
      case "addRecord":
        return <EHRForm />;
      default:
        return (
          <div className="text-center p-8">
            <h2 className="text-3xl font-bold">🏥 Welcome to HealthChain Dashboard</h2>
            <p className="mt-4 text-gray-600">Please select an option from the menu to get started.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-300 via-blue-200 to-pink-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold">HealthChain Dashboard</h1>
        <ConnectWallet onConnect={() => console.log("Wallet connected")} />
      </div>

      <nav className="flex space-x-4 mb-8 justify-center">
        <button
          onClick={() => setActiveTab("home")}
          className={`px-6 py-2 rounded-full ${activeTab === "home" ? "bg-blue-600 text-white" : "bg-white text-black"} shadow-md hover:bg-blue-500 hover:text-white`}
        >
          Home
        </button>
        <button
          onClick={() => setActiveTab("fetchById")}
          className={`px-6 py-2 rounded-full ${activeTab === "fetchById" ? "bg-blue-600 text-white" : "bg-white text-black"} shadow-md hover:bg-blue-500 hover:text-white`}
        >
          Fetch By ID
        </button>
        <button
          onClick={() => setActiveTab("fetchAll")}
          className={`px-6 py-2 rounded-full ${activeTab === "fetchAll" ? "bg-blue-600 text-white" : "bg-white text-black"} shadow-md hover:bg-blue-500 hover:text-white`}
        >
          Fetch All Records
        </button>
        <button
          onClick={() => setActiveTab("addRecord")}
          className={`px-6 py-2 rounded-full ${activeTab === "addRecord" ? "bg-blue-600 text-white" : "bg-white text-black"} shadow-md hover:bg-blue-500 hover:text-white`}
        >
          Add New Record
        </button>
      </nav>

      <div className="max-w-6xl mx-auto bg-white bg-opacity-80 backdrop-blur-md p-8 rounded-2xl shadow-lg">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
