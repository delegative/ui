
import 'dotenv/config';

import { EAS, Offchain, SchemaEncoder, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";
import lighthouse from '@lighthouse-web3/sdk'
import axios from "axios";
import { visit } from 'graphql';





const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26
const privateKey = process.env.PRIVATE_KEY;
const apiKey = process.env.IPFS_API_KEY;
const schemaID = process.env.SCHEMA_ID;
let refUID = "0x0000000000000000000000000000000000000000000000000000000000000000";
const baseURL = `https://sepolia.easscan.org`;
const members = [
  "0xe49e77DBe09F99eB3f084BEf20723f613f6EeC3a", // Demo 0
  "0xBC766bE8947b995281c49Ce1b1C65cE8573D2ad2", // Demo 1
  "0x02Eda2F5b4d496C321C126c3B921363C35aaCE32", // Demo 2
  "0x356e9DffeCFc2c819889c2a29F187c3e026a62e1", // Demo 3
  "0x160a611234A6D668EEe2a6FFD14e13AD8672cc92", // Demo 4
  "0x724Ebd7051234E28069364424634cdB4E16D6c51", // Demo 5
  "0x9DaE8b020d26FF335527f2e3B6FD94D96B92a16B", // Demo 6
  "0xc38eB88a493Dc6925e98d17F632535073f267003", // Demo 7
  "0x07f30493fC6C318Aaa5C315C43b3f6D7C4b1A5e3", // Demo 8
  "0x168e2413ca0E985E3EC7aE8392836139B6bfECEc"  // Demo 9
];


const members_priv_keys = [ // only used for submitting an off-chain attestation
  process.env.PRIVATE_KEY_0,
  process.env.PRIVATE_KEY_1,
  process.env.PRIVATE_KEY_2,
  process.env.PRIVATE_KEY_3,
  process.env.PRIVATE_KEY_4,
  process.env.PRIVATE_KEY_5,
  process.env.PRIVATE_KEY_6,
  process.env.PRIVATE_KEY_7,
  process.env.PRIVATE_KEY_8,
  process.env.PRIVATE_KEY_9,
];



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
  

 async function performOffChainAttestation(recipient, refUID, privateKey){
    const signer = new ethers.Wallet(privateKey, provider);
    const offchainAttestation = await offchain.signOffchainAttestation({
      recipient: recipient,
      // Unix timestamp of when attestation expires. (0 for no expiration)
      expirationTime: 0,
      // Unix timestamp of current time
      time: Math.floor(new Date().getTime()/1000),
      revocable: true,
      nonce: 1, // TODO increment the nonce
      schema: schemaID,
      refUID: refUID,
      expirationTime: 0,
      version: 1,
      data: encodedData,
    }, signer);
    
    console.log("New off-chain attestation: ", offchainAttestation);
    return offchainAttestation;
}

// const f = 2;
// const t = 9;
// const actual_member = members[f];
// refUID = "0xcff23ada4172a7ccf24c02a5b485cc208edc7c3537167004edcd6d6287f0f5eb";
// const recipient = members[t];
// const actual_private_key = members_priv_keys[f];
// console.log(actual_member, recipient, actual_private_key);
// const signedOffchainAttestation = await performOffChainAttestation(recipient, refUID, actual_private_key);

// const pkg = {
//   signer: actual_member, 
//   sig: signedOffchainAttestation
// }

// const response = await submitSignedAttestation(pkg);
// console.log(response);

async function uploadToIPFS(attestation){
  var buf = Buffer.from(JSON.stringify(attestation));
  const uploadResponse = await lighthouse.uploadText(buf, apiKey); // path, apiKey
  
  console.log(uploadResponse);
  
  const ipfsHash = uploadResponse.data.Hash;
  // console.log("IPFS storage hash: ", ipfsHash);
  return ipfsHash;
}

async function getIPFSFile(address){
  return await lighthouse.getUploads(address);
}


async function submitSignedAttestation(pkg) {
  const data = {
    filename: `eas.txt`,
    textJson: JSON.stringify(pkg),
  };

  return await axios.post(`${baseURL}/offchain/store`, data);
}


async function getAttestationsForAddress(address) {
  const response = await axios.post(
    `${baseURL}/graphql`,
    {
      query:
        "query Attestations($where: AttestationWhereInput, $orderBy: [AttestationOrderByWithRelationInput!]) {\n  attestations(where: $where, orderBy: $orderBy) {\n    attester\n    revocationTime\n    expirationTime\n    time\n    recipient\n    id\n    data\n   decodedDataJson\n revoked\n refUID\n }\n}",
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
            // {
            //   recipient: {
            //     equals: address,
            //   },
            // },
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

//const signedOffchainAttestation = await performOffChainAttestation(RECIPIENT, refUID);

// const pkg = {
//   signer: "0x7d63b26F6a4308832AbFd0434753Fdc8316177D7", 
//   sig: signedOffchainAttestation
// }

//const response = await submitSignedAttestation(pkg);



//console.log(response);

//const attestations = await getAttestationsForAddress(ADDRESS);


let allInfo = [];

function collectAllInformation(attestations){
  // console.log(attstns);
  console.log("Number of attestations:", Object.keys(attestations).length);
  let act = {};

  for (const key in attestations) { 
    act = {
    from: attestations[key].attester,
    to: attestations[key].recipient,
    parent_attestation: attestations[key].refUID === "0x0000000000000000000000000000000000000000000000000000000000000000" ? "No parent attestation" : attestations[key].refUI,
    revoked: attestations[key].revoked,
    isFurtherDelegable: JSON.parse(attestations[key].decodedDataJson)[0].value.value,
    }
    allInfo.push(act);
  }
  return act;
}


async function exploreDelegationGraph(address){
  console.log(address);
  const attestations = await getAttestationsForAddress(address);
  for (const key in attestations){
    console.log(attestations[key].recipient);
  }
}

let visited = JSON.parse(JSON.stringify(members));
async function exploreMemberGraphRecursive(member){
  console.log(member);
  const childMembers = await getAttestationsForAddress(member);
  if (childMembers.length === 0 || member === undefined){
    return;
  }else{
    console.log(member.attester);
    for (const child in childMembers){
      console.log("Child member:", childMembers[child].recipient);
      visited = visited.filter((element) => element !== child.recipient);
      await exploreMemberGraphRecursive(child);
    }
  }
}

// let i = 0;
// while (visited.length !== 0){
//   await exploreMemberGraphRecursive(visited[i]);
//   i = i + 1;
// }

let linkedList = [];
async function exploreMembersGraph(){
  let i = 0;
  for (const member of members){
    console.log("Member:", i,  member);
    const attestations = await getAttestationsForAddress(member);
    while (attestations.length !== 0){
      const actualAttestation = attestations.pop();
      if (!actualAttestation.revoked){
        console.log("Member attested:", actualAttestation.recipient);
        linkedList.push({[member] : actualAttestation.recipient});
        const new_attestations = await getAttestationsForAddress(member);

      }
    }
    i = i + 1;
    console.log('\n');
  }
}

await exploreMembersGraph();
console.log(linkedList);
//await exploreDelegationGraph(members[f]);


//allInfo.push(collectAllInformation(attestations));
//console.log(allInfo);

function buildAdjList(attestations, address){
  // console.log(attstns);
  console.log("Number of attestations:", Object.keys(attestations).length);
  let connections = [address];
  let lastElement = "";
  for (const key in attestations) { 
    connections.push(attestations[key].recipient);
    lastElement = attestations[key].recipient;
  }
  console.log(lastElement);
  const tmp = connections;
  //tmp = Array.from(new Set(connections));
  // tmp.pop();
  return {[lastElement] : tmp};
}

//let adjList = [];
//adjList.push(buildAdjList(attestations, ADDRESS));
//console.log(adjList);

// // IPFS things
// const ipfsHash = await uploadToIPFS(offchainAttestation);
// const uploads = await getIPFSFile(process.env.ADDRESS);
// console.log(uploads);
// // -----------------
