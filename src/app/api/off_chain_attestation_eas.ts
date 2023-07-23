
// import 'dotenv/config';

import { EAS, Offchain, SchemaEncoder, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";
import lighthouse from '@lighthouse-web3/sdk'
import axios from "axios";





const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26
const privateKey = process.env.PRIVATE_KEY;
const apiKey = process.env.IPFS_API_KEY;
const schemaID = process.env.SCHEMA_ID;
const RECIPIENT = "0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165";
const refUID = "0x0000000000000000000000000000000000000000000000000000000000000000";
const baseURL = `https://sepolia.easscan.org`;




// Initialize Offchain class with EAS configuration
const EAS_CONFIG = {
  address: EASContractAddress,
  version: "0.26", // 0.26
  chainId: 11155111,
};

const offchain = new Offchain(EAS_CONFIG, 1);

// Initialize SchemaEncoder with the schema string
const schemaEncoder = new SchemaEncoder("bool isFurtherDelegable");
const encodedData = schemaEncoder.encodeData([
  { name: "isFurtherDelegable", value: true, type: "bool" },
]);


// Gets a default provider (in production use something else like infura/alchemy)
const provider = ethers.providers.getDefaultProvider(
  "sepolia"
);


async function performOffChainAttestation(recipient, refUID) {
  const signer = new ethers.Wallet(privateKey, provider);
  console.log(recipient, refUID);
  const offchainAttestation = await offchain.signOffchainAttestation({
    recipient: recipient,
    // Unix timestamp of when attestation expires. (0 for no expiration)
    expirationTime: 0,
    // Unix timestamp of current time
    time: 1671219636,
    revocable: true,
    nonce: 0, // TODO increment the nonce
    schema: schemaID,
    refUID: refUID,
    version: 1,
    data: encodedData,
  }, signer);

  // console.log("New off-chain attestation: ", offchainAttestation);
  return offchainAttestation;
}


async function uploadToIPFS(attestation) {
  var buf = Buffer.from(JSON.stringify(attestation));
  const uploadResponse = await lighthouse.uploadText(buf, apiKey); // path, apiKey

  console.log(uploadResponse);

  const ipfsHash = uploadResponse.data.Hash;
  // console.log("IPFS storage hash: ", ipfsHash);
  return ipfsHash;
}

async function getIPFSFile(address) {
  return await lighthouse.getUploads(address);
}


async function submitSignedAttestation(pkg) {
  const data = {
    filename: `eas.txt`,
    textJson: JSON.stringify(pkg),
  };

  return await axios.post(`${baseURL}/offchain/store`, data);
}


export const getAttestationsForAddress = async (address:string) => {
  console.log(address);
  const response = await axios.post(
    `${baseURL}/graphql`,
    {
      query:
        "query Attestations($where: AttestationWhereInput, $orderBy: [AttestationOrderByWithRelationInput!]) {\n  attestations(where: $where, orderBy: $orderBy) {\n    attester\n    revocationTime\n    expirationTime\n    time\n    recipient\n    id\n    data\n  }\n}",
      variables: {
        where: {
          schemaId: {
            equals: schemaID,
          },
          OR: [
            {
              attester: {
                equals: address,
              },
            },
            {
              recipient: {
                equals: address,
              },
            },
          ],
        },
        orderBy: [
          {
            time: "desc",
          },
        ],
      },
    },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  return response.data.data.attestations;
}

const signedOffchainAttestation = await performOffChainAttestation(RECIPIENT, refUID);

const response = await submitSignedAttestation(signedOffchainAttestation);

//console.log(response);

const attstns = await getAttestationsForAddress("0x7d63b26F6a4308832AbFd0434753Fdc8316177D7");

// console.log(attstns);
console.log("Number of attestations:", Object.keys(attstns).length);

// // IPFS things
// const ipfsHash = await uploadToIPFS(offchainAttestation);
// const uploads = await getIPFSFile(process.env.ADDRESS);
// console.log(uploads);
// // -----------------
