"use client";

import React, { useState } from "react";
import { ethers } from "ethers";
import RecordDisplay from "@/components/RecordDisplay";

const contractAddress = "0x5fc81082F7deb7045741FcFa1B53158F6326F3DA"; // ✅ Your deployed address
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

const FetchRecords: React.FC = () => {
  const [records, setRecords] = useState<RecordData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [inputPatientId, setInputPatientId] = useState<string>("");

  const fetchById = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setMessage(null);

      if (!window.ethereum) throw new Error("Metamask not found");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const record = await contract.getRecord(inputPatientId);

      if (!record || !record[0]) {
        setMessage("No record found for this ID.");
        setRecords([]);
        return;
      }

      const formattedRecord: RecordData = {
        dateOfBirth: record[0],
        gender: record[1],
        medicalHistory: record[2],
        allergies: record[3],
        currentMedications: record[4],
        lastVisit: record[5],
      };

      setRecords([formattedRecord]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to fetch record");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAll = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setMessage(null);

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
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter Patient ID"
          className="border p-2 rounded w-full md:w-auto"
          value={inputPatientId}
          onChange={(e) => setInputPatientId(e.target.value)}
        />
        <button
          onClick={fetchById}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full md:w-auto"
          disabled={!inputPatientId}
        >
          Fetch by ID
        </button>
        <button
          onClick={fetchAll}
          className="bg-green-500 text-white px-4 py-2 rounded w-full md:w-auto"
        >
          Fetch All
        </button>
      </div>

      <RecordDisplay
        records={records}
        isLoading={isLoading}
        error={error}
        message={message}
      />
    </div>
  );
};

export default FetchRecords;
