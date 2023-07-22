"use client";

import { useContext, useState } from "react";
import {
  SismoConnectButton,
  SismoConnectResponse,
  SismoConnectVerifiedResult,
} from "@sismo-core/sismo-connect-react";
import {
  CONFIG,
  AUTHS,
  CLAIMS,
  SIGNATURE_REQUEST,
  AuthType,
  ClaimType,
} from "./sismo-connect-config";
import { SismoContext, SismoState, SismoStatus } from "./components/SismoProvider";


const proposalData = {
  title: 'Shall we use semicolon for our js codebase?',
}

export default function Home() {
  const [sismoConnectVerifiedResult, setSismoConnectVerifiedResult] =
    useState<SismoConnectVerifiedResult>();
  const [sismoConnectResponse, setSismoConnectResponse] = useState<SismoConnectResponse>();

  const [error, setError] = useState<string>("");

  const { sismoState } = useContext(SismoContext)

  const [isShowResponse, setIsShowResponse] = useState<boolean>(false);


  return (
    <>
      <main className="main">
        <>

          <section>
            <h3>Proposal 123: {proposalData?.title}</h3>
            <h4>You can either vote with privacy 🤫, or delegate to domain expert  </h4>
          </section>
          <section>

            <div>
              Step1: Are you Eligible to vote?
              Connect Sismo and we will check privately 🤫
            </div>
            {
              sismoState?.status !== SismoStatus.Init && (
                <div>
                  zk Badges Generated
                  <button
                    className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    type="button"
                    onClick={() => setIsShowResponse(!isShowResponse)}>
                    {isShowResponse ? 'Hide Response' : 'Show Response'}
                  </button>
                  <div className={isShowResponse ? "" : "!visible hidden"} id="collapseExample" data-te-collapse-item>
                    <div
                      className="block rounded-lg p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 dark:text-neutral-50">
                      <code className="whitespace-break-spaces text-xs">
                        response:
                        {
                          JSON.stringify(sismoState?.response, null, 4)
                        }
                        {
                          JSON.stringify(sismoState?.verifyResult, null, 4)
                        }
                      </code>

                    </div>

                  </div>

                </div>
              )
            }



          </section>

          <section>
            <div>Step2: If you want to delegate to domain expert</div>

            <button>
              Delegate
            </button>
          </section>



        </>



        {/* Table for Verified Auths */}
        {sismoConnectVerifiedResult && (
          <>
            <h3>Verified Auths</h3>
            <table>
              <thead>
                <tr>
                  <th>AuthType</th>
                  <th>Verified UserId</th>
                </tr>
              </thead>
              <tbody>
                {sismoConnectVerifiedResult.auths.map((auth, index) => (
                  <tr key={index}>
                    <td>{AuthType[auth.authType]}</td>
                    <td>{auth.userId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        <br />

        {/* Table for Verified Claims */}
        {sismoConnectVerifiedResult && (
          <>
            <h3>Verified Claims</h3>
            <table>
              <thead>
                <tr>
                  <th>groupId</th>
                  <th>ClaimType</th>
                  <th>Verified Value</th>
                </tr>
              </thead>
              <tbody>
                {sismoConnectVerifiedResult.claims.map((claim, index) => (
                  <tr key={index}>
                    <td>
                      <a
                        target="_blank"
                        href={"https://factory.sismo.io/groups-explorer?search=" + claim.groupId}
                      >
                        {claim.groupId}
                      </a>
                    </td>
                    <td>{ClaimType[claim.claimType!]}</td>
                    <td>{claim.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        <h3>This proposal requires you to have these..</h3>

        {/* Table of the Auths requests*/}
        <h3>Auths requested</h3>
        <table>
          <thead>
            <tr>
              <th>AuthType</th>
              <th>Requested UserId</th>
              <th>Optional?</th>
              <th>ZK proof</th>
            </tr>
          </thead>
          <tbody>
            {AUTHS.map((auth, index) => (
              <tr key={index}>
                <td>{AuthType[auth.authType]}</td>
                <td>{readibleHex(auth.userId || "No userId requested")}</td>
                <td>{auth.isOptional ? "optional" : "required"}</td>
                {sismoConnectResponse ? (
                  <td>{readibleHex(getProofDataForAuth(sismoConnectResponse, auth.authType)!)}</td>
                ) : (
                  <td> ZK proof not generated yet </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <br />

        {/* Table of the Claims requests*/}
        <h3>Claims requested</h3>
        <table>
          <thead>
            <tr>
              <th>GroupId</th>
              <th>ClaimType</th>
              <th>Requested Value</th>
              <th>Can User Select Value?</th>
              <th>Optional?</th>
              <th>ZK proof</th>
            </tr>
          </thead>
          <tbody>
            {CLAIMS.map((claim, index) => (
              <tr key={index}>
                <td>
                  <a
                    target="_blank"
                    href={"https://factory.sismo.io/groups-explorer?search=" + claim.groupId}
                  >
                    {claim.groupId}
                  </a>
                </td>
                <td>{ClaimType[claim.claimType || 0]}</td>
                <td>{claim.value ? claim.value : "1"}</td>
                <td>{claim.isSelectableByUser ? "yes" : "no"}</td>
                <td>{claim.isOptional ? "optional" : "required"}</td>
                {sismoConnectResponse ? (
                  <td>
                    {readibleHex(
                      getProofDataForClaim(
                        sismoConnectResponse,
                        claim.claimType || 0,
                        claim.groupId!,
                        claim.value || 1
                      )!
                    )}
                  </td>
                ) : (
                  <td> ZK proof not generated yet </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Table of the Signature request and its result */}
        <h3>Signature requested and verified</h3>
        <table>
          <thead>
            <tr>
              <th>Message Requested</th>
              <th>Can User Modify message?</th>
              <th>Verified Signed Message</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{SIGNATURE_REQUEST.message}</td>
              <td>{SIGNATURE_REQUEST.isSelectableByUser ? "yes" : "no"}</td>
              <td>
                {sismoConnectVerifiedResult
                  ? sismoConnectVerifiedResult.signedMessage
                  : "ZK proof not verified yet"}
              </td>
            </tr>
          </tbody>
        </table>

        <section>

          <div>
            Step3: Vote for the proposal privately 🤫
          </div>
          <button className="bg-blue">✔️Yes</button>
          <button className="bg-red">❌No</button>

        </section>

      </main >
    </>
  );
}

function readibleHex(userId: string, startLength = 6, endLength = 4, separator = "...") {
  if (!userId.startsWith("0x")) {
    return userId; // Return the original string if it doesn't start with "0x"
  }
  return userId.substring(0, startLength) + separator + userId.substring(userId.length - endLength);
}

function getProofDataForAuth(
  sismoConnectResponse: SismoConnectResponse,
  authType: AuthType
): string | null {
  for (const proof of sismoConnectResponse.proofs) {
    if (proof.auths) {
      for (const auth of proof.auths) {
        if (auth.authType === authType) {
          return proof.proofData;
        }
      }
    }
  }

  return null; // returns null if no matching authType is found
}

function getProofDataForClaim(
  sismoConnectResponse: SismoConnectResponse,
  claimType: number,
  groupId: string,
  value: number
): string | null {
  for (const proof of sismoConnectResponse.proofs) {
    if (proof.claims) {
      for (const claim of proof.claims) {
        if (claim.claimType === claimType && claim.groupId === groupId && claim.value === value) {
          return proof.proofData;
        }
      }
    }
  }

  return null; // returns null if no matching claimType, groupId and value are found
}
