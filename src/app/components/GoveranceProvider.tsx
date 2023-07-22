import { AuthType, SismoConnectProof } from "@sismo-core/sismo-connect-react";
import { SismoConnectResponse, SismoConnectVerifiedResult } from "@sismo-core/sismo-connect-server";
import { createContext, useContext, useEffect, useState } from "react";
import { PROPOSALS, Proposal } from "../proposal";
import { SismoContext } from "./SismoProvider";
import { aggregateVotingPower, asVotingPower } from "../voting-power";

export const GoveranceContext = createContext<{
    proposal: Proposal | null,
    votingPowerEligible: number,
    votingPowerAggregated: number
}>({
    proposal: null,
    votingPowerEligible: 0,
    votingPowerAggregated: 0
});


export const GoveranceProvider = ({ children }: { children: React.ReactNode }) => {

    const [votingPowerEligible, setVotingPowerEligible] = useState(0);
    const [votingPowerAggregated, setVotingPowerAggregated] = useState(0);

    const proposal = PROPOSALS[0]
    const { sismoState } = useContext(SismoContext);

    useEffect(() => {
        console.log('updated sismo');
        if (!sismoState.response) {
            return;
        }

        const votingPowerEligible = asVotingPower(proposal, sismoState.response);

        console.log('votingPowerEligible', votingPowerEligible);

        const votingPowerAggregated = aggregateVotingPower(votingPowerEligible)

        setVotingPowerEligible(votingPowerEligible);
        setVotingPowerAggregated(votingPowerAggregated);

    }, [sismoState?.status])



    return (
        <GoveranceContext.Provider value={
            {
                proposal,
                votingPowerEligible,
                votingPowerAggregated
            }
        }>

            {children}
        </GoveranceContext.Provider>
    )

}