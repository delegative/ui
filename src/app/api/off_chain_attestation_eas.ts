
// import 'dotenv/config';

import { EAS, Offchain, SchemaEncoder, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";
import lighthouse from '@lighthouse-web3/sdk'
import axios from "axios";
import { queryAttestationsWithAddress } from "./get_attestations_from_address";
import { DELEGATES_FIXTURE } from "../delegates.fixture";
import _, { at } from "lodash";


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
// const provider = ethers.providers.getDefaultProvider(
//   "sepolia"
// );


// async function performOffChainAttestation(recipient:string, refUID:string, privateKey:string) {
//   const signer = new ethers.Wallet(privateKey, provider);
//   console.log(recipient, refUID);
//   const offchainAttestation = await offchain.signOffchainAttestation({
//     recipient: recipient,
//     // Unix timestamp of when attestation expires. (0 for no expiration)
//     expirationTime: 0,
//     // Unix timestamp of current time
//     time: Math.floor(new Date().getTime()/1000),
//     revocable: true,
//     nonce: 0, // TODO increment the nonce
//     schema: schemaID!,
//     refUID,
//     version: 1,
//     data: encodedData,
//   }, signer);

//   // console.log("New off-chain attestation: ", offchainAttestation);
//   return offchainAttestation;
// }


// async function uploadToIPFS(attestation) {
//   var buf = Buffer.from(JSON.stringify(attestation));
//   const uploadResponse = await lighthouse.uploadText(buf, apiKey); // path, apiKey

//   console.log(uploadResponse);

//   const ipfsHash = uploadResponse.data.Hash;
//   // console.log("IPFS storage hash: ", ipfsHash);
//   return ipfsHash;
// }

// async function getIPFSFile(address) {
//   return await lighthouse.getUploads(address);
// }


// async function submitSignedAttestation(pkg) {
//   const data = {
//     filename: `eas.txt`,
//     textJson: JSON.stringify(pkg),
//   };

//   return await axios.post(`${baseURL}/offchain/store`, data);
// }

export type Attestion = {
  revoked: boolean;
  attestor: string;
  recipient: string;
  
};

// export const exploreMembersGraph = async (addresses:string[], attestationsByAddress: Record<string, Attestion>)=>{
//   let linkedList = [];
//   addresses.forEach(
//       address=>{
//       const attestations = attestationsByAddress[address];

//       attestations.forEach((attestation:Attestion)=> {
//         if (!attestation.revoked){
//           linkedList.push({[address] : attestation.recipient});
//         }
      
//       })
//     }
//   )

//   return linkedList;
// }


// scenario of recipient of multipe addresses


// step 1 find all edges and build adj list

// step 2 always start with leave nodes at each iterations & pop to ensure no missing 

export const buildAdjList =  (addresses:string[], attestationsByAddress: Record<string, Attestion[]>)=>{
  let adjList: Record<string, any[]> = _.fromPairs(addresses.map(address=>[address, []]));
  addresses.forEach(
      address=>{
      const attestations = attestationsByAddress[address];
      attestations.forEach((attestation:Attestion)=> {
        // ignore those irrelevant attestations
        if (!attestation.revoked && addresses.includes(attestation.recipient)){
          adjList[attestation.recipient] = adjList[attestation.recipient] || [];
          if(!adjList[attestation.recipient].includes(address)){
              // suppose double delegations handled & all revoked
            adjList[attestation.recipient].push(address);          
          }
 
        }
      })
    }
  )

  return adjList;
}

export const flowWeights = (adjList:Record<string, string[]>, weightsByAddress: Record<string, number>)=>{
  const adjListPairs = _.toPairs(adjList);
  const pairsWithEmpty = _.filter(adjListPairs, ([key, addresses])=>{
    return _.isEmpty(addresses);
  });


  console.log('pairsWithEmpty', pairsWithEmpty);

  pairsWithEmpty.forEach(([key, ])=>{
      _.forEach(adjListPairs, (pair)=>{
        const [toAddress, addresses] = pair;
        if(addresses.includes(key)){
          weightsByAddress[toAddress] += weightsByAddress[key];
          weightsByAddress[key]=0;
          console.log('remove', key, '->', toAddress, weightsByAddress[key])
          _.pull(addresses, key);
        }

      })
  });


// pass by ref
console.log('remove keys', pairsWithEmpty.map(([key, ])=>key));
adjList = _.omit(adjList, pairsWithEmpty.map(([key, ])=>key));
console.log('adjList', adjList, weightsByAddress);
}



export const loadAttestationsAndBuildGraph = async (votingWeightByAddress: Record<string, number>)=>{
  const addresses =_.keys(votingWeightByAddress);
  const pairs = await Promise.all(
    addresses.map(async (address)=>{

      const attestations = await queryAttestationsWithAddress(address);

      return [address, attestations];
    })

  );

  const attestationsByAddress =  _.fromPairs(pairs);

 const adjList =  buildAdjList(addresses, attestationsByAddress);

 console.log('adjList', adjList);


  const adjListInProcess = _.cloneDeep(adjList);
  const votingWeightByAddressInProcess = _.cloneDeep(votingWeightByAddress);

 console.log('votingWeightByAddress', votingWeightByAddress);


_.range(0, 6).forEach(()=>{
  flowWeights(adjListInProcess, votingWeightByAddressInProcess);
})

//  while(_.keys(votingWeightByAddress).length>1){
//   flowWeights(adjList, votingWeightByAddress);
//  }
 console.log('aggregated', votingWeightByAddressInProcess);

 return {
  adjList,
  votingWeightAggregatedByAddress: votingWeightByAddressInProcess
 }
}