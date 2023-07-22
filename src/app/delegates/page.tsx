"use client";

import DelegateCard from "../components/DelegateCard";
import DelegateFlowWidget from "../components/DelegateFlowWidget";
import { DELEGATES_FIXTURE } from "../delegates.fixture";


export type Delegate = {
    address: string;
    name: string;
    title: string;
    description?: string;
    ownVotingPower?: number;
    totalVotingPower?: number;
}

export default function Page() {

    const delegates = DELEGATES_FIXTURE;

    return (
        <div>

            <section>
                <h2>Setp1. Check current delegation power</h2>
                <div className="grid grid-cols-4 gap-4">
                    <DelegateFlowWidget />
                </div>
            </section>
            <section>
                <h2>Setp2. Find delegates you truely trust </h2>
                Delegate Directory
                <div className="grid grid-cols-4 gap-4">
                    {
                        delegates.map((delegate, index) => {
                            return (
                                <div key={index}>
                                    <DelegateCard delegate={delegate} />
                                </div>
                            )
                        })
                    }
                </div>
            </section>

            <section>
                <h2>Setp3.  Attest your delegation </h2>
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
                        value="0x123" />
                </div>
                <button className="bg-blue">Confirm</button>

            </section>

        </div>
    )
}
