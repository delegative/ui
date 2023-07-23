import { EAS, Offchain, SchemaEncoder, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { ethers} from 'ethers';
import { queryGraphql } from "../graph-service";

export const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26


const schemaID = process.env.SCHEMA_ID || '0xc15554c5e83e68eed9e6ff417acb164302258f7f9cccd4bbab03ba99bd242973';

export const queryAttestationsWithAddress = async (address:string) => {
  const queryObject = {
    query:
      "query Attestations($where: AttestationWhereInput, $orderBy: [AttestationOrderByWithRelationInput!]) {\n  attestations(where: $where, orderBy: $orderBy) {\n    attester\n  revoked\n   revocationTime\n    expirationTime\n    time\n    recipient\n    id\n    data\n  }\n}",
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
        ],
      },
      orderBy: [
        {
          time: "desc",
        },
      ],
    },
  };

  const baseURL = `https://sepolia.easscan.org`;

  const data = await queryGraphql(`${baseURL}/graphql`, queryObject)

  console.log('data', data)

  return data.attestations;

}

// eas untested, use graphql
export const getAttestationsWithAddress = async (address: string) =>{

  const attestations = await queryAttestationsWithAddress(address)
  
  console.log('aaa', attestations);

  return attestations;

  
  // console.log(attestation);
  
  // console.log("From: ", attestation.attester);
  // console.log("To: ", attestation.recipient);
  // //console.log("Timestamp: ", new Date(parseInt(attestation.time._hex, 16)));
  // const timestamp_of_attestation = parseInt(attestation.time._hex, 16);
  // console.log("Timestamp: ", new Date(timestamp_of_attestation*1000));
  // console.log("Revocable? ", attestation.revocable);
  // console.log("Revoked? ", attestation.revocationTime._hex === "0x00" ? false : true);
  // console.log("isFurtherDelegable? ", attestation.data === 0x0 ? false : true);
  
}
