const fs = require('fs');
const path = require('path');
const { fileURLToPath } = require('url');

// Configuration
const ABI_DIR = path.join(__dirname, '../../nextjs/abis');
const CONTRACT_NAME = 'LensScoreSBT';

// Hardhat deployment artifacts directory
const DEPLOYMENTS_DIR = path.join(__dirname, '../deployments-zk/lensTestnet/contracts/' + CONTRACT_NAME +'.sol');

// Read contract information from Hardhat deployment artifacts
const getContractDeploymentInfo = () => {
  try {
    const networkFiles = fs.readdirSync(DEPLOYMENTS_DIR);
    // Assuming you have only one network file, or adjust logic for multiple networks
    const networkFile = networkFiles.find((file) => file.endsWith('.json'));
    if (!networkFile) {
      throw new Error('No deployment files found in the deployments directory');
    }
    const deploymentPath = path.join(DEPLOYMENTS_DIR, networkFile);
    const deploymentData = JSON.parse(fs.readFileSync(deploymentPath, 'utf8'));
    const contractInfo = deploymentData;
    if (!contractInfo) {
      throw new Error(`Contract "${CONTRACT_NAME}" not found in deployment data`);
    }
    return {
      abi: contractInfo.abi,
      address: contractInfo.entries[0].address,
    };
  } catch (error) {
    console.error('Error reading deployment information:', error.message);
    throw error;
  }
};

// Generate ABI and address file
const generateAbiAndAddress = () => {
  try {
    const { abi, address } = getContractDeploymentInfo();
    const contractInfo = {
      abi,
      contractAddress: address,
    };
    const infoFilePath = path.join(ABI_DIR, `${CONTRACT_NAME}.info.js`);
    const exportContent = `
      export const abi = ${JSON.stringify(contractInfo.abi, null, 2)};
      export const contractAddress = "${contractInfo.contractAddress}";
    `;
    fs.writeFileSync(infoFilePath, exportContent.trim());
    console.log(`Info stored at: ${infoFilePath}`);
  } catch (error) {
    console.error('Error generating files:', error.message);
  }
};

// Execute script
generateAbiAndAddress();
