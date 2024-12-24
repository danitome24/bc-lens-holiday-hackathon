const fs = require('fs');
const path = require('path');

// Configuración
const ABI_DIR = path.join(__dirname, '../abis');
const CONTRACT_NAME = 'LensScoreSBT';
const DEPLOYED_ADDRESS = '0x6a7c2a820b0a94848df1c48a210a2fbf98abb648'; // Reemplaza con la dirección del contrato desplegado

// Leer el ABI del contrato compilado
const contractJsonPath = path.join(__dirname, `../out/${CONTRACT_NAME}.sol/${CONTRACT_NAME}.json`);
const contractJson = JSON.parse(fs.readFileSync(contractJsonPath, 'utf8'));

// Generar archivo con ABI y dirección
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
    console.log(`Información completa guardada en: ${infoFilePath}`);
  } catch (error) {
    console.error("Error al generar los archivos:", error.message);
  }
};

// Ejecutar el script
generateAbiAndAddress();
