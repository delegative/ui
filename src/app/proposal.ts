import {
    ClaimType,
    AuthType,
    SignatureRequest,
    AuthRequest,
    ClaimRequest,
    SismoConnectConfig,
  } from "@sismo-core/sismo-connect-client";

// yes we will couple criteria with sismo for now
export type Criterion = {
    authType?: AuthType;
    claimType?: ClaimType;
    groupId?: string;
    isOptional?: boolean;
    weight?: number;
}

export type Proposal = {
    id: string;
    title: string;
    style: string;
    criteria: Criterion[];
    startTime: number,
    endTime: number
};


export const PROPOSALS: Proposal[] = [
    {
        id: '1',
        title: 'Shall we use semicolon for our js codebase?',
        criteria: [
            { authType: AuthType.EVM_ACCOUNT, weight: 10 },
            { authType: AuthType.GITHUB, isOptional: true, weight: 11 },
            { authType: AuthType.TWITTER, isOptional: true , weight: 12},
            {
                "claimType":0,
                groupId:"0x2ca1efd034c5d55cffab84a848625ef6",
                weight: 13
            }
            
        ],
        style: 'human',
        startTime: 1640058965,
        endTime: 1690059046
    },
    {
        id: '2',
        title: 'Proposal 2',
        criteria: [

        ],
        style: 'nouns',
        startTime: 1640058965,
        endTime: 1690059046
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