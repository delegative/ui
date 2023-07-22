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
eas.connect(provider);

const address = process.env.ADDRESS;

const attestations = await eas.getAttestationsForAddress(address);

console.log(attestations);

// console.log(attestation);

// console.log("From: ", attestation.attester);
// console.log("To: ", attestation.recipient);
// //console.log("Timestamp: ", new Date(parseInt(attestation.time._hex, 16)));
// const timestamp_of_attestation = parseInt(attestation.time._hex, 16);
// console.log("Timestamp: ", new Date(timestamp_of_attestation*1000));
// console.log("Revocable? ", attestation.revocable);
// console.log("Revoked? ", attestation.revocationTime._hex === "0x00" ? false : true);
// console.log("isFurtherDelegable? ", attestation.data === 0x0 ? false : true);
