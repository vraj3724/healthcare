# 🏥 HealthChain – Blockchain-Based Patient Record Management

**HealthChain** is a decentralized application (DApp) that enables secure and tamper-proof storage of electronic health records (EHR) using Ethereum smart contracts. Built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **ethers.js**, the app interacts with a Solidity smart contract deployed via **Remix**.

---

## 🚀 Features

- 🧾 Add detailed patient health records to the Ethereum blockchain
- 🔍 Fetch individual records by patient ID
- 📜 Retrieve all stored patient records
- 🦾 MetaMask wallet integration
- 🔐 Immutable and transparent data via smart contracts

---

## 🧱 Smart Contract Overview (`EHRContract.sol`)

The Solidity smart contract supports the following functions:

- `addRecord(...)`: Adds a complete patient health record
- `getRecord(patientId)`: Fetches a specific patient's data
- `getAllPatientIds()`: Lists all stored patient IDs

Deployed to:  
**Sepolia Testnet Address**: `0x5fc81082F7deb7045741FcFa1B53158F6326F3DA`

---

## 🖥️ Tech Stack

| Layer       | Tech                             |
|-------------|----------------------------------|
| Frontend    | Next.js (App Router), TypeScript |
| UI/Styling  | Tailwind CSS                     |
| Blockchain  | Solidity, Ethereum (Sepolia)     |
| Wallet      | MetaMask                         |
| Web3        | ethers.js                        |
| Hosting     | Remix IDE (for smart contract)   |

---

## 📂 Project Structure

```bash
src/
├── app/                # Next.js pages
│   ├── dashboard/      # Add/view/fetch records
│   ├── records/        # Fetch by ID
│   └── all-records/    # Fetch all
├── components/
│   ├── ConnectWallet.tsx
│   ├── EHRForm.tsx
│   ├── FetchRecords.tsx
│   ├── FetchAllRecords.tsx
│   └── RecordDisplay.tsx
├── contracts/          # EHRContract.json
├── types/              # TypeScript interfaces (optional)
```

---

## 🔧 How to Run Locally

### Prerequisites
- Node.js
- MetaMask (browser extension)
- Ethereum Sepolia testnet funds (via faucet)

### Steps

```bash
git clone https://github.com/vraj3724/healthcare.git
cd healthcare
npm install
npm run dev
```

Then open: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

---

## 🛠 Smart Contract Deployment (Remix)

1. Open [Remix IDE](https://remix.ethereum.org)
2. Paste the `EHRContract.sol` code
3. Compile the contract
4. Deploy it using Injected Web3 (MetaMask)
5. Copy the contract address and update it in:
   - `EHRForm.tsx`
   - `FetchAllRecords.tsx`
   - `FetchRecords.tsx`

---

## 🧪 Key Components

- **`ConnectWallet.tsx`**: Handles MetaMask wallet connection
- **`EHRForm.tsx`**: Adds new patient health records
- **`FetchRecords.tsx`**: Retrieves data by patient ID
- **`FetchAllRecords.tsx`**: Lists all stored records
- **`RecordDisplay.tsx`**: Formats and displays the health records

---

## 📈 Future Improvements

- 🛡️ Role-based access for doctors/patients
- 🧬 IPFS integration for large file storage
- 🔒 End-to-end encryption
- ✅ Unit testing and CI/CD pipelines

---

## 🤝 Contributors

- [vraj3724](https://github.com/vraj3724) – Full-stack Blockchain Developer

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
