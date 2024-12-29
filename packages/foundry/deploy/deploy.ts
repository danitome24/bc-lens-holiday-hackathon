import { Deployer } from "@matterlabs/hardhat-zksync";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Wallet } from "zksync-ethers";
import * as dotenv from "dotenv";
dotenv.config();

export default async function (hre: HardhatRuntimeEnvironment) {
  // Initialize the wallet.
  const wallet = new Wallet(process.env.PRIVATE_KEY);

  // Create deployer object and load the artifact of the contract we want to deploy.
  const deployer = new Deployer(hre, wallet);

  // Load contract
  const artifact = await deployer.loadArtifact("LensScoreSBT");

  // `initialNumber` is an argument for contract constructor.
  const imageUri =
    "https://aquamarine-accepted-haddock-468.mypinata.cloud/ipfs/bafkreifv4ufcrhebgygkvc45ke7uh4hga7bizb4ifzsv4psb2yrcsnhpm4";
  const greeterContract = await deployer.deploy(artifact, [imageUri]);

  // Show the contract info.
  console.log(
    `${
      artifact.contractName
    } was deployed to ${await greeterContract.getAddress()}`
  );
}
