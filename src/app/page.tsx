"use client";
import { useContext, useEffect, useState } from "react";

import {
  AuthType,
  ClaimType,
} from "./sismo-connect-config";
import { SismoContext, SismoState, SismoStatus } from "./components/SismoProvider";
import { Criterion, PROPOSALS, Proposal } from "./proposal";
import Link from "next/link";
import { asVotingPower } from "./voting-power";
import { GoveranceContext } from "./components/GoveranceProvider";
import { compareAsc, format } from 'date-fns';
import axios from 'axios';

const createCriterionLabel = (criterion: Criterion) => {

  return (
    <div className="p-2 bg-white text-black">
      <span className="inline-block">
        {
          criterion.authType ? AuthType[criterion.authType] : ClaimType[criterion.claimType!]
        }
      </span>
      &nbsp;
      <span className="inline-block">
        🎫+{criterion.weight}
      </span>
    </div>

  );


}


const VotingPowerSection = ({ proposal, sismoState }: { proposal: Proposal | null, sismoState: SismoState }) => {
  const [isShowResponse, setIsShowResponse] = useState<boolean>(false);

  return (
    <section>

      <div>
        Step1: How much voting power you have?
        🛈 Connect Sismo and we will check privately 🤫
      </div>
      <h4>
        📊 voting weight breakdown
      </h4>
      <ul>
        {
          proposal?.criteria.map(
            criterion => {
              return (
                <li className="w-full border-neutral-100 border-opacity-100 py-1 dark:border-opacity-50">
                  {createCriterionLabel(criterion)}
                </li>
              )
            }
          )
        }
      </ul>
      {
        sismoState?.status !== SismoStatus.Init && (
          <div>
            zk Badges Generated. No Worries we'll keep that secret! &nbsp;
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
  )
}

export default function Home() {

  const [error, setError] = useState<string>("");

  const { sismoState } = useContext(SismoContext);
  const { proposal } = useContext(GoveranceContext);

  const [votingResults, setVotingResults] = useState({ for: 0, against: 0 });
  const DATE_FORMAT = 'yyyy-MM-dd HH:mm:ss';
  const ipfsUrl = `https://gateway.lighthouse.storage/ipfs/${proposal?.resultIpfsCid}`;

  useEffect(() => {
    axios.get(ipfsUrl).then(res => {
      setVotingResults(res.data);
    })
  }, [])

  return (
    <>
      <main className="main">
        <>
          <section>
            <h3>🗳️Proposal-{proposal?.id}: {proposal?.title}</h3>
            <h4>🛈 You can either vote with privacy 🤫, or delegate to domain expert  </h4>

            <h4>Period: {format(proposal?.startTime!, DATE_FORMAT)} -  {format(proposal?.endTime!, DATE_FORMAT)}  </h4>
          </section>




          <VotingPowerSection proposal={proposal} sismoState={sismoState} />

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

        <section>

          <div>
            Step4: Check Vote Results 🎉

          </div>
          <span>
            🛈Demo, only shown after voting completed</span>

          <div>
            {/* Total Participations: 123 /  230 70% */}
            <Link href={ipfsUrl} target="blank" scroll={false}>
              on IPFS
            </Link>

          </div>
          <div>
            <div
              className="flex items-center justify-between rounded-t-lg border-b-2 border-success/20 bg-success-100 bg-clip-padding px-4 pb-2 pt-2.5">
              <p className="flex items-center font-bold text-success-700">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="check-circle"
                  className="mr-2 h-4 w-4 fill-current"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512">
                  <path
                    fill="currentColor"
                    d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path>
                </svg>
                Proposal-1 has been Passed!
              </p>
            </div>
          </div>

          <div>
            For:  {votingResults.for} &nbsp;
            Against:  {votingResults.against}
          </div>


        </section >


      </main >
    </>
  );
}


