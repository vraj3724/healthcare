
'use client';

import {useState, useEffect} from 'react';
import {getHealthRecord, HealthRecord} from '@/services/blockchain';
import {CardTitle, CardDescription, CardContent} from '@/components/ui/card';

export function RecordView() {
  const [record, setRecord] = useState<HealthRecord | null>(null);

  useEffect(() => {
    async function fetchRecord() {
      const healthRecord = await getHealthRecord('1'); // Fetch a default record for now
      setRecord(healthRecord);
    }

    fetchRecord();
  }, []);

  return (
    <div className="flex flex-col h-full">
      {record ? (
        <>
          <CardTitle>Patient Name: {record.patientName}</CardTitle>
          <CardDescription>Medical History:</CardDescription>
          <CardContent>{record.medicalHistory}</CardContent>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">No health record available.</p>
        </div>
      )}
    </div>
  );
}
