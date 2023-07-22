import _ from 'lodash';
import { Auth, Claim, SismoConnectProof, SismoConnectResponse } from "@sismo-core/sismo-connect-react";
import { Proposal } from './proposal';

// similar to gitocin passport

// both auths / claims can carry extra voting weights regardless optional or not



export const asVotingPower = (proposal: Proposal, sismoResponse: SismoConnectResponse)=>{
    // const auth =  _.find(sismoResponse.proofs?.[0].auths) ? 1 : 0;

    // const base = !!sismoResponse?.proofs?.length ? 10 : 0;
    
    return _.sumBy(
        sismoResponse.proofs, 
        (proof:SismoConnectProof) => _.sum([

            _.sumBy(proof.auths, (auth: Auth)=>{

                const criterion = _.find(proposal.criteria, criteria=> auth.authType === criteria?.authType);
                    console.log('auth criterion match', criterion)
        
                return criterion?.weight || 0;
            }),
            _.sumBy(proof.claims, (claim: Claim)=>{

                const criterion = _.find(proposal.criteria, criteria=> claim.groupId === criteria?.groupId);
                    console.log('auth criterion match', criterion)
        
                return criterion?.weight || 0;
            })]
        )
        
    )
    
}

export const aggregateVotingPower = (votingPowerEligible: number, delegations: any[]= [])=>{
    // votingPowerEligible
    return votingPowerEligible + _.sum(delegations.map(delegation=> delegation?.votingPower || 0));
}
