// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract EHRContract {
    struct Record {
        string dateOfBirth;
        string gender;
        string[] medicalHistory;
        string[] allergies;
        string[] currentMedications;
        string lastVisit;
    }

    mapping(string => Record) private records;
    string[] private allPatientIds;

    // ✅ Add a new health record
    function addRecord(
        string memory _patientId,
        string memory _dateOfBirth,
        string memory _gender,
        string[] memory _medicalHistory,
        string[] memory _allergies,
        string[] memory _currentMedications,
        string memory _lastVisit
    ) public {
        records[_patientId] = Record(
            _dateOfBirth,
            _gender,
            _medicalHistory,
            _allergies,
            _currentMedications,
            _lastVisit
        );
        allPatientIds.push(_patientId);
    }

    // ✅ Fetch a record by patientId
    function getRecord(string memory _patientId) public view returns (
        string memory, string memory, string[] memory, string[] memory, string[] memory, string memory
    ) {
        Record storage rec = records[_patientId];
        return (
            rec.dateOfBirth,
            rec.gender,
            rec.medicalHistory,
            rec.allergies,
            rec.currentMedications,
            rec.lastVisit
        );
    }

    // ✅ Fetch all patient IDs
    function getAllPatientIds() public view returns (string[] memory) {
        return allPatientIds;
    }
}
