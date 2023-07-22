import { EAS, Offchain, SchemaEncoder, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import ethers from 'ethers';
import 'dotenv/config';

export const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26

// Initialize the sdk with the address of the EAS Schema contract address
const eas = new EAS(EASContractAddress);

// Gets a default provider (in production use something else like infura/alchemy)
const provider = ethers.providers.getDefaultProvider(
  "sepolia"
);

// Connects an ethers style provider/signingProvider to perform read/write functions.
// MUST be a signer to do write operations!

const privateKey = process.env.PRIVATE_KEY;

const data = ethers.utils.formatBytes32String(0xb74450269ae812940acd85d40adcb434cc0a9e93a89da962c5c68652a28211fa);

const signer = new ethers.Wallet(privateKey, provider);
eas.connect(signer);

const transaction = await eas.revokeOffchain(data, signer);

await transaction.wait();

console.log(attestation);

