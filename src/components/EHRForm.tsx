"use client";

import React, { useState } from 'react';
import { ethers } from 'ethers';

const contractAddress = '0x5fc81082F7deb7045741FcFa1B53158F6326F3DA'; // ✅ Update after deploy
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

interface FormData {
  patientId: string;
  dateOfBirth: string;
  gender: string;
  medicalHistory: string;
  allergies: string;
  currentMedications: string;
  lastVisit: string;
}

const EHRForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    patientId: '',
    dateOfBirth: '',
    gender: '',
    medicalHistory: '',
    allergies: '',
    currentMedications: '',
    lastVisit: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!window.ethereum) {
      setError('Metamask not installed');
      return;
    }

    try {
      setIsLoading(true);
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const medicalHistoryArray = formData.medicalHistory.split(',').map(item => item.trim());
      const allergiesArray = formData.allergies.split(',').map(item => item.trim());
      const medicationsArray = formData.currentMedications.split(',').map(item => item.trim());

      const tx = await contract.addRecord(
        formData.patientId,
        formData.dateOfBirth,
        formData.gender,
        medicalHistoryArray,
        allergiesArray,
        medicationsArray,
        formData.lastVisit
      );
      await tx.wait();

      setSuccessMessage(`Record added successfully! Tx Hash: ${tx.hash}`);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Transaction Failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded shadow-md">
      <h2 className="text-xl font-semibold">Enter EHR Details</h2>
      <input type="text" name="patientId" placeholder="Patient ID" value={formData.patientId} onChange={handleInputChange} required className="w-full p-2 border rounded" />
      <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} required className="w-full p-2 border rounded" />
      <input type="text" name="gender" placeholder="Gender" value={formData.gender} onChange={handleInputChange} required className="w-full p-2 border rounded" />
      <textarea name="medicalHistory" placeholder="Medical History (comma separated)" value={formData.medicalHistory} onChange={handleInputChange} className="w-full p-2 border rounded" />
      <textarea name="allergies" placeholder="Allergies (comma separated)" value={formData.allergies} onChange={handleInputChange} className="w-full p-2 border rounded" />
      <textarea name="currentMedications" placeholder="Current Medications (comma separated)" value={formData.currentMedications} onChange={handleInputChange} className="w-full p-2 border rounded" />
      <input type="date" name="lastVisit" value={formData.lastVisit} onChange={handleInputChange} required className="w-full p-2 border rounded" />
      {error && <div className="text-red-500">{error}</div>}
      {successMessage && <div className="text-green-500">{successMessage}</div>}
      <button type="submit" disabled={isLoading} className="bg-blue-500 text-white p-2 rounded">
        {isLoading ? 'Saving...' : 'Save Record to Blockchain'}
      </button>
    </form>
  );
};

export default EHRForm;
