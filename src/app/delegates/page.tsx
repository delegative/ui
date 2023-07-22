"use client";
import React from 'react';

import DelegateCard from "../components/DelegateCard";
import DelegateFlowWidget from "../components/DelegateFlowWidget";
import { DELEGATES_FIXTURE } from "../delegates.fixture";
import { attestDelegation } from '../delegate-service';


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

    const delegates = DELEGATES_FIXTURE;

    const onDelegateClick = (address: string) => {
        setDelegateTarget(address)
    }

    const onAttestDelegationClick = async (address: string) => {
        const results = await attestDelegation(address);
    }

    return (
        <>
            <section>
                <h3>Delegate if you don't know how to vote on this!</h3>
                <h4>Step 1. Check current delegation flows</h4>
                <div className="grid grid-cols-4 gap-4">
                    <DelegateFlowWidget />
                </div>
            </section>
            <section>
                <h2>Step 2. Find delegates you truely trust </h2>
                🛈 delegate and trust them to eventually delegate to whom has the expertise to govern
                <div className="grid grid-cols-4 gap-4">
                    {
                        delegates.map((delegate, index) => {
                            return (
                                <div key={index}>
                                    <DelegateCard delegate={delegate} onDelegateClick={onDelegateClick} />
                                </div>
                            )
                        })
                    }
                </div>
            </section>

            <section id="delegate-attestion">
                <h2>Step3.  Attest your delegation </h2>
                <div>
                    Double delegation will be found and discarded!
                </div>
                <div>
                    From: your address
                </div>
                <div>
                    To:
                    <input
                        type="text"
                        className="peer block min-h-[auto] w-full rounded border-0 bg-white text-black px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlInput1"
                        value={delegateTarget} />
                </div>
                <button onClick={() => delegateTarget && onAttestDelegationClick(delegateTarget)} className="bg-french-red">Attest Delegation</button>

            </section>

            {/* make it red to highlight myself, duplicate the flow chart */}
            <section>
                <h2>Step4.  Track your delegation </h2>

                Your current delegations

                <div>
                    From: 0xA To: 0xB
                </div>

                Don't like your delegate? Revoke it!

                <div>
                    Double delegation will be found and discarded!
                </div>


            </section>
        </>
    )
}
