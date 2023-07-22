"use client";

import { useContext, useEffect, useState } from "react";
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
import { PROPOSALS } from "./proposal";
import Link from "next/link";
import { asVotingPower } from "./voting-power";
import { GoveranceContext } from "./components/GoveranceProvider";

export default function Home() {

  const [error, setError] = useState<string>("");

  const { sismoState } = useContext(SismoContext);
  const { proposal } = useContext(GoveranceContext);

  const [isShowResponse, setIsShowResponse] = useState<boolean>(false);

  useEffect(() => {
    console.log('updated sismo');
    if (!sismoState.response || !proposal) {
      return;
    }

    const votingPower = asVotingPower(proposal, sismoState.response);

    console.log('votingPower', votingPower);
  }, [sismoState?.status, proposal?.id])

  return (

    <>
      <main className="main">
        <>

          <section>
            <h3>🗳️Proposal: {proposal?.title}</h3>
            <h4>🛈 You can either vote with privacy 🤫, or delegate to domain expert  </h4>

            <h4>Start Period:  {proposal?.starTime} </h4>
            <h4>End Period:  {proposal?.endTime}  </h4>
          </section>


          {/* results */}
          Total Participations: 123 /  230 70%
          For: 12
          Against: 11


          <section>

            <div>
              Step1: Are you Eligible to vote?
              Connect Sismo and we will check privately 🤫
            </div>

            <div>
              <h4>This proposal requires you to have these..</h4>


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

            <Link href="/delegates">
              <button className="bg-french-red">
                Delegate
              </button>
            </Link>
          </section>



        </>

        <br />

        <section>

          <div>
            Step3: Vote for the proposal privately 🤫
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button className="bg-french-red">☑️ For</button>
            <button className="bg-french-red">🙅‍♀️ Against</button>
          </div>

        </section>


      </main >
    </>
  );
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
