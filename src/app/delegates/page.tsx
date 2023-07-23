"use client";
import React, { useContext, useEffect } from 'react';

import DelegateCard from "../components/DelegateCard";
import DelegateFlowWidget from "../components/DelegateFlowWidget";
import { DELEGATES_FIXTURE } from "../delegates.fixture";
import { attestDelegation } from '../delegate-service';
import Link from 'next/link';
import { PROPOSALS } from '../proposal';
import { GoveranceContext } from '../components/GoveranceProvider';
import { SismoContext } from '../components/SismoProvider';
import axios from 'axios';
import { asReadibleHex } from '../util';


export type Delegate = {
    address: string;
    name: string;
    imageUrl: string;
    ens: string;
    title: string;
    domainTags: string[];
    description?: string;
    isDelegating?: boolean;
    ownVotingPower?: number;
    totalVotingPower?: number;
}

export default function Page() {

    const [delegateTarget, setDelegateTarget] = React.useState<string | undefined>('0x12345abcde');

    const [attestations, setAttestations] = React.useState<any[]>([]);

    const delegates = DELEGATES_FIXTURE;

    const { proposal } = useContext(GoveranceContext);


    const attestationId = '0xa82c42f2bd86cc0c6443045532104bbaba84a42e59e0eb206c58f8770ceb6d5b'

    const onDelegateClick = (address: string) => {
        setDelegateTarget(address)
    }

    const onAttestDelegationClick = async (address: string) => {
        const results = await attestDelegation(address);
    }

    const { sismoState } = useContext(SismoContext);

    const { userId } = sismoState;

    useEffect(() => {

        if (!userId) {
            return;
        }
        axios.get(
            `/api/attestations?address=${userId}`
        ).then(res => {
            console.log('query attestations', res.data)
            setAttestations(res.data)
        })
        if (!sismoState.response) {
            return;
        }

    }, [sismoState?.status])


    const attestation = attestations?.[0] || {};

    return (
        <main className="main">
            <section className="mt-5">
                <h3>Delegate if you don't know how to vote on this!</h3>
                <h4>Step 1. Check current delegation flows</h4>
                <div className="grid grid-cols-1 gap-1">
                    <DelegateFlowWidget />
                </div>
            </section>
            <section>
                <h2>Step 2. Find delegates you truely trust </h2>
                🛈 Whitelisted delegates of proposal -- you can trust them to eventually delegate to whom has the expertise to govern
                <div className="grid grid-cols-4 gap-4">
                    {
                        delegates.map((delegate, index) => {
                            return (
                                <div key={index}>
                                    <DelegateCard style={proposal?.style} delegate={delegate} onDelegateClick={onDelegateClick} />
                                </div>
                            )
                        })
                    }
                </div>
            </section>

            <section id="delegate-attestion">
                <h2>Step3.  Attest your delegation </h2>
                <div>
                    🛈 Double delegation will be found and discarded!
                </div>
                <div>
                    From: {asReadibleHex(userId)}
                </div>
                <div>
                    To:
                    <input
                        type="text"
                        className="peer block min-h-[auto] w-full rounded border-0 bg-white text-black px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlInput1"
                        value={delegateTarget} />
                </div>
                <Link target="_blank" href="https://sepolia.easscan.org/attestation/attestWithSchema/0xc15554c5e83e68eed9e6ff417acb164302258f7f9cccd4bbab03ba99bd242973" >
                    <button onClick={() => delegateTarget && onAttestDelegationClick(delegateTarget)} className="bg-french-red">Attest Delegation</button>
                </Link>
            </section>

            {/* make it red to highlight myself, duplicate the flow chart */}
            <section>
                <h2>Step4. Track your delegation</h2>
                <div>
                    🛈 Don't like your delegate? Revoke it!
                    Double delegation will be found and discarded.
                </div>
                <br />
                <div>
                    <span className="inline-block">
                        From: {asReadibleHex(attestation.attester)} To: {asReadibleHex(attestation.recipient)}
                    </span>
                    &nbsp;
                    <span className="inline-block">
                        Timestamp: {attestation.time}
                    </span>
                </div>
                <div>
                    <span className="inline-block">
                        attestation: &nbsp;
                    </span>
                    <span className="inline-block">
                        <Link target="_blank" href={`https://sepolia.easscan.org/offchain/attestation/view/${attestationId}`} >
                            {asReadibleHex(attestationId)}
                        </Link>
                    </span>
                </div>


                <Link target="_blank" href={`https://sepolia.easscan.org/offchain/attestation/view/${attestationId}`} >
                    <button className="bg-french-red">Revoke Delegation</button>
                </Link>


            </section>
        </main >
    )
}
