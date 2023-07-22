import {
    ClaimType,
    AuthType,
    SignatureRequest,
    AuthRequest,
    ClaimRequest,
    SismoConnectConfig,
  } from "@sismo-core/sismo-connect-client";
  
export type Criteria = {

}

export type Proposal = {
    id: string;
    title: string,
    criteria: Criteria[]
};


export const PROPOSALS: Proposal[] = [

    {
        id: '1',
        title: 'Shall we use semicolon for our js codebase?',
        criteria: [
            { authType: AuthType.EVM_ACCOUNT, weight: 0 },
            { authType: AuthType.GITHUB, isOptional: true, weight: 10 },
            { authType: AuthType.TWITTER, isOptional: true, weight: 10 }
        ]
    },
    {
        id: '2',
        title: 'Proposal 2',
        criteria: [

        ]
    }
]

export const asSismoConfig  = (proposal: Proposal): {
    auths: AuthRequest[],
    claims: ClaimRequest[],
} =>{

    return {
        auths: [],
        claims: [],
    }
}