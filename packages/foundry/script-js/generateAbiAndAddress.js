import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ABI_DIR = path.join(__dirname, '../../nextjs/abis');
const CONTRACT_NAME = 'LensScoreSBT';
const DEPLOYED_ADDRESS = '0x6a7c2a820b0a94848df1c48a210a2fbf98abb648';

// Read abi from json file
const contractJsonPath = path.join(__dirname, `../out/${CONTRACT_NAME}.sol/${CONTRACT_NAME}.json`);
const contractJson = JSON.parse(fs.readFileSync(contractJsonPath, 'utf8'));

// Generate abi and address file
const generateAbiAndAddress = () => {
  try {
    const contractInfo = {
      abi: contractJson.abi,
      contractAddress: DEPLOYED_ADDRESS,
    };
    const infoFilePath = path.join(ABI_DIR, `${CONTRACT_NAME}.info.js`);
    const exportContent = `
      export const abi = ${JSON.stringify(contractInfo.abi, null, 2)};
      export const contractAddress = "${contractInfo.contractAddress}";
    `;
    fs.writeFileSync(infoFilePath, exportContent.trim());
    console.log(`Info stored at: ${infoFilePath}`);
  } catch (error) {
    console.error("Error generating files:", error.message);
  }
};

// Execute script
generateAbiAndAddress();
