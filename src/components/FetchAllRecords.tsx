"use client";

import React, { useState } from "react";
import { ethers } from "ethers";
import RecordDisplay from "@/components/RecordDisplay";

const contractAddress = "0x5fc81082F7deb7045741FcFa1B53158F6326F3DA"; // ✅ your address
const contractABI = [{
	"inputs": [
		{
			"internalType": "string",
			"name": "_patientId",
			"type": "string"
		},
		{
			"internalType": "string",
			"name": "_dateOfBirth",
			"type": "string"
		},
		{
			"internalType": "string",
			"name": "_gender",
			"type": "string"
		},
		{
			"internalType": "string[]",
			"name": "_medicalHistory",
			"type": "string[]"
		},
		{
			"internalType": "string[]",
			"name": "_allergies",
			"type": "string[]"
		},
		{
			"internalType": "string[]",
			"name": "_currentMedications",
			"type": "string[]"
		},
		{
			"internalType": "string",
			"name": "_lastVisit",
			"type": "string"
		}
	],
	"name": "addRecord",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [],
	"name": "getAllPatientIds",
	"outputs": [
		{
			"internalType": "string[]",
			"name": "",
			"type": "string[]"
		}
	],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [
		{
			"internalType": "string",
			"name": "_patientId",
			"type": "string"
		}
	],
	"name": "getRecord",
	"outputs": [
		{
			"internalType": "string",
			"name": "",
			"type": "string"
		},
		{
			"internalType": "string",
			"name": "",
			"type": "string"
		},
		{
			"internalType": "string[]",
			"name": "",
			"type": "string[]"
		},
		{
			"internalType": "string[]",
			"name": "",
			"type": "string[]"
		},
		{
			"internalType": "string[]",
			"name": "",
			"type": "string[]"
		},
		{
			"internalType": "string",
			"name": "",
			"type": "string"
		}
	],
	"stateMutability": "view",
	"type": "function"
}];

interface RecordData {
  dateOfBirth: string;
  gender: string;
  medicalHistory: string[];
  allergies: string[];
  currentMedications: string[];
  lastVisit: string;
}

const FetchAllRecords: React.FC = () => {
  const [records, setRecords] = useState<RecordData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!window.ethereum) throw new Error("Metamask not found");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const allIds = await contract.getAllPatientIds();

      const allRecordsPromises = allIds.map(async (pid: string) => {
        const rec = await contract.getRecord(pid);
        return {
          dateOfBirth: rec[0],
          gender: rec[1],
          medicalHistory: rec[2],
          allergies: rec[3],
          currentMedications: rec[4],
          lastVisit: rec[5],
        };
      });

      const fetchedRecords = await Promise.all(allRecordsPromises);
      setRecords(fetchedRecords);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to fetch records");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <button onClick={fetchAll} className="bg-green-500 text-white px-4 py-2 rounded mb-6">
        Fetch All Records
      </button>

      <RecordDisplay records={records} isLoading={isLoading} error={error} message={null} />
    </div>
  );
};

export default FetchAllRecords;
