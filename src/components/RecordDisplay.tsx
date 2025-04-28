"use client";

import React from "react";

interface RecordData {
  dateOfBirth: string;
  gender: string;
  medicalHistory: string[];
  allergies: string[];
  currentMedications: string[];
  lastVisit: string;
}

interface Props {
  records: RecordData[];
  isLoading: boolean;
  error: string | null;
  message: string | null;
}

const RecordDisplay: React.FC<Props> = ({ records, isLoading, error, message }) => {
  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  if (message) return <div className="text-center p-4">{message}</div>;
  if (records.length === 0) return <div className="text-center p-4">No records found.</div>;

  return (
    <div className="p-6 border rounded shadow-md bg-white">
      <h2 className="text-2xl font-semibold mb-4">Health Records</h2>
      {records.map((record, index) => (
        <div key={index} className="mb-6 border rounded p-4">
          <h3 className="text-lg font-medium mb-2">Record {index + 1}</h3>
          <p><strong>Date of Birth:</strong> {record.dateOfBirth}</p>
          <p><strong>Gender:</strong> {record.gender}</p>
          <p><strong>Medical History:</strong> {record.medicalHistory.join(", ")}</p>
          <p><strong>Allergies:</strong> {record.allergies.join(", ")}</p>
          <p><strong>Current Medications:</strong> {record.currentMedications.join(", ")}</p>
          <p><strong>Last Visit:</strong> {record.lastVisit}</p>
        </div>
      ))}
    </div>
  );
};

export default RecordDisplay;
