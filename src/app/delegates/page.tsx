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
                Delegate Chart
                <div className="grid grid-cols-4 gap-4">
                    <DelegateFlowWidget />
                </div>
            </section>
            <section>
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
        </div>
    )
}
