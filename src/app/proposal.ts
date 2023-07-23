import {
    ClaimType,
    AuthType,
    SignatureRequest,
    AuthRequest,
    ClaimRequest,
    SismoConnectConfig,
  } from "@sismo-core/sismo-connect-client";
import { Delegate } from "./delegates/page";
import { DELEGATES_FIXTURE } from "./delegates.fixture";

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
    description: string;
    tags?: string[];
    style: string;
    criteria: Criterion[];
    startTime: number,
    endTime: number,
    delegateAddresses?: string[];
    resultIpfsCid?: string;
};



export const PROPOSALS: Proposal[] = [

    {
        id: '1',
        title: "The Future of Learning: Integrating DAOs into the Education System",
        description: "We propose to explore and implement the integration of decentralized autonomous organizations (DAOs) into the educational sector. We believe DAOs can revolutionize the way education is administrated, funded, and developed, creating a more democratic, community-driven approach. The project will involve researching the educational sector and identifying potential areas for DAO integration, developing a strategic plan for integrating DAOs into educational administration and development, engaging with educational communities to get their feedback and buy-in, and working with educational institutions to pilot DAO-based programs or initiatives. This proposal will require funding for research, community engagement, and pilot implementation.",
        tags: ['education', 'DAO', 'development'],
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
        startTime: 1689704965000,
        endTime: 1690059046000,
        delegateAddresses:DELEGATES_FIXTURE.map(d=>d.address),
        // mock up
        resultIpfsCid: 'QmQS1L8X8TkNtCVKdGm7bTqVfnzbDqEURC9mocvsKaeWW4'
    },
    {
        id: '2',
        title: "Amplifying Our Voice: Sponsoring a Major Tech Conference",
        description: "We propose to sponsor a major tech conference as a strategic marketing move. By doing so, we can increase awareness of our DAO, attract potential collaborators, and position ourselves as leaders in the DAO and blockchain space. The sponsorship will involve identifying a suitable tech conference that aligns with our DAO's mission and has significant reach in our target audience, negotiating a sponsorship deal that maximizes our visibility and impact, such as keynote speaking slots, booth space, and branding opportunities, and preparing and delivering high-quality presentations, demos, and marketing materials for the conference. We will need funding for the sponsorship fee, preparation and delivery of presentations and demos, and travel and accommodation for attendees from our DAO.",
        tags: ['marketing', 'conference', 'sponsorship'],
        criteria: [
            { authType: AuthType.EVM_ACCOUNT, weight: 10 },
            { authType: AuthType.GITHUB, isOptional: true, weight: 20 },
            {
                "claimType":0,
                groupId:"0x2ca1efd034c5d55cffab84a848625ef6",
                weight: 43
            }
            
        ],
        style: 'nouns',
        startTime: 1689704965000,
        endTime: 1690059046000,
    },
    {
        id: '3',
        title: "Greening Our DAO: An Initiative to Reduce Our Environmental Impact",
        description: "We propose to launch an initiative to reduce the environmental impact of our DAO. This could involve transitioning to more energy-efficient blockchain technologies, offsetting our carbon emissions, and promoting environmental responsibility within our DAO and the broader blockchain community. The initiative will involve conducting an audit of our DAO's environmental footprint and identifying areas for improvement, researching and implementing energy-efficient blockchain technologies, offsetting our carbon emissions through investments in renewable energy or carbon capture projects, and launching a campaign to raise awareness of environmental issues within our DAO and the broader blockchain community. This initiative will require funding for the environmental audit, implementation of energy-efficient technologies, carbon offsetting, and awareness-raising campaign.",
        tags: ['environment', 'sustainability', 'blockchain'],
        criteria: [

        ],
        style: 'human',
        startTime: 1640058965000,
        endTime: 1690059046000
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