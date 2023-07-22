

export const VotingPowerWidget = ({ votingPowerEligible, votingPowerAggregated }:
    { votingPowerEligible: number, votingPowerAggregated: number }) => {
    return (
        <>
            <span className="inline-block text-black" >
                🎫
                Eligible:{votingPowerEligible} /
            </span>
            <span className="inline-block text-black" >
                Aggregated: {votingPowerAggregated}
            </span>
        </>
    )
}