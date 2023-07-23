import * as _ from 'lodash';
import { Delegate } from "./delegates/page";
import { withHeadImageUrl } from './assets';


export const DELEGATES_FIXTURE_RAW = [
    
    {
        address: '0x160a611234A6D668EEe2a6FFD14e13AD8672cc92',
        name: 'DApp Developers',
        ens: 'dappdevelopers.eth',
        title: 'Software Developers',
        description: 'We are a team of developers dedicated to building decentralized applications on Ethereum',
        votingPowerEligible: 25,
        domainTags: ['software', 'DAppDevelopment']
    },
   
    {
        address: '0x356e9DffeCFc2c819889c2a29F187c3e026a62e1',
        name: 'IoT Innovators',
        ens: 'IoTinnovators.eth',
        title: 'Blockchain and IoT Enthusiasts',
        description: 'We are dedicated to exploring the intersection of IoT and blockchain technologies',
        votingPowerEligible: 12,
        domainTags: ['IoT', 'blockchain']
    },
    
    {
        address: '0xBC766bE8947b995281c49Ce1b1C65cE8573D2ad2',
        name: 'The Engineer',
        ens: 'theengineer.eth',
        title: 'Engineers Collective',
        description: 'A collective of civil, mechanical, and electrical engineers passionate about integrating blockchain into real-world infrastructure projects',
        votingPowerEligible: 15,
        domainTags: ['engineering']
    },
    {
        address: '0xe49e77DBe09F99eB3f084BEf20723f613f6EeC3a',
        name: 'Silicon Alley Enthusiast',
        ens: 'siliconalley.eth',
        title: 'Tech Entrepreneurs Group',
        description: 'We are a group of tech entrepreneurs and enthusiasts based in the heart of New York City\'s Silicon Alley',
        votingPowerEligible: 10,
        domainTags: ['software', 'startups']
    },
    {
        address: '0x9DaE8b020d26FF335527f2e3B6FD94D96B92a16B',
        name: 'Chain of Economists',
        ens: 'chainofeconomists.eth',
        title: 'Economists Group',
        description: 'We are a group of economists studying the impact of blockchain technology on global economies',
        votingPowerEligible: 38,
        domainTags: ['economics']
    },
    {
        address: '0x02Eda2F5b4d496C321C126c3B921363C35aaCE32',
        name: 'Venture Visionaries',
        ens: 'venturevisionaries.eth',
        title: 'Blockchain Venture Capitalists',
        description: 'We are a group of venture capitalists with a focus on funding and growing blockchain startups',
        votingPowerEligible: 20,
        domainTags: ['business', 'venturecapital']
    },
  
    {
        address: '0x724Ebd7051234E28069364424634cdB4E16D6c51',
        name: 'Crypto Lawyers',
        ens: 'cryptolawyers.eth',
        title: 'Legal Professionals',
        description: 'We are a consortium of legal professionals specializing in crypto regulations and compliance',
        votingPowerEligible: 8,
        domainTags: ['law', 'regulations']
    },
    
    {
        address: '0xc38eB88a493Dc6925e98d17F632535073f267003',
        name: 'Green Crypto',
        ens: 'greencrypto.eth',
        title: 'Environment Enthusiasts',
        description: 'We are an environmental organization focused on promoting energy-efficient blockchain solutions',
        votingPowerEligible: 14,
        domainTags: ['environment', 'energyEfficiency']
    },
    {
        address: '0x07f30493fC6C318Aaa5C315C43b3f6D7C4b1A5e3',
        name: 'Crypto Marketers',
        ens: 'cryptomarketers.eth',
        title: 'Marketing Professionals',
        description: 'We are a team of marketing professionals catering to the specific needs of blockchain startups',
        votingPowerEligible: 16,
        domainTags: ['marketing']
    },
    {
        address: '0x168e2413ca0E985E3EC7a8f56aF3A06F6aE9cFb5',
        name: 'Blockchain Bakers',
        ens: 'blockchainbakers.eth',
        title: 'Blockchain Educators',
        description: 'We are a group dedicated to educating the masses about the benefits and applications of blockchain technology',
        votingPowerEligible: 13,
        domainTags: ['education', 'blockchain']
    }

    // {
    //     address: '0x1',
    //     name: 'Crypto 6729',
    //     ens: 'theengineer.eth',
    //     title: 'cofounder at pg',
    //     description: 'We are a group of tech entrepreneurs and enthusiasts based in the heart of New York City\'s Silicon Alley',
    //     votingPowerEligible: 12,
    //     totalVotingPower: 24,
    //     domaindomainTags: ['legal', 'software']
    // },
    // {
    //     address: '0x1',
    //     name: 'Crypto 6729',
    //     ens: 'siliconalley.eth',
    //     title: 'cofounder at pg',
    //     description: 'We are a group of tech entrepreneurs and enthusiasts based in the heart of New York City\'s Silicon Alley',
    //     votingPowerEligible: 12,
    //     totalVotingPower: 24,
    //     domaindomainTags: ['legal', 'software']
    // },
    // {
    //     address: '0x3',
    //     name: 'Nanny Doe',
    //     title: 'Director at ABC foundation',
    //     isDelegating: true,
    //     votingPowerEligible: 21,
    //     totalVotingPower: 55
    // },
    // {
    //     address: '0x4',
    //     name: 'Ar Doe',
    //     title: 'Director at DEF foundation',
    //     votingPowerEligible: 21,
    //     totalVotingPower: 55
    // },
    // {
    //     address: '0x5',
    //     name: 'Punk',
    //     title: 'Director at ZZZ foundation',
    //     votingPowerEligible: 21,
    //     totalVotingPower: 55
    // }
] as  Delegate[];

export const DELEGATES_FIXTURE = DELEGATES_FIXTURE_RAW.map((delegate, index)=>{

    return {
        ...delegate,
        // imageUrl: `https://tecdn.b-cdn.net/img/new/avatars/${_.random( 1,9)}.webp`

        imageUrl: withHeadImageUrl()
    }
})


// siliconalley.eth, 0x1a2b...3c4d, Silicon Alley Enthusiast, We are a group of tech entrepreneurs and enthusiasts based in the heart of New York City's Silicon Alley, #software #startups

// theengineer.eth, 0x4e5f...6g7h, The Engineer, A collective of civil, mechanical, and electrical engineers passionate about integrating blockchain into real-world infrastructure projects, #engineering

// venturevisionaries.eth, 0x7h8i...9j0k, Venture Visionaries, We are a group of venture capitalists with a focus on funding and growing blockchain startups, #business #venturecapital

// IoTinnovators.eth, 0x0a1b...2c3d, IoT Innovators, We are dedicated to exploring the intersection of IoT and blockchain technologies, #IoT #blockchain

// cryptolawyers.eth, 0x3d4e...5f6g, Crypto Lawyers, We are a consortium of legal professionals specializing in crypto regulations and compliance, #law #regulations

// dappdevelopers.eth, 0x6g7h...8i9j, DApp Developers, We are a team of developers dedicated to building decentralized applications on Ethereum, #software #DAppDevelopment

// chainofeconomists.eth, 0x9j0k...1l2m, Chain of Economists, We are a group of economists studying the impact of blockchain technology on global economies, #economics

// greencrypto.eth, 0x2m3n...4o5p, Green Crypto, We are an environmental organization focused on promoting energy-efficient blockchain solutions, #environment #energyEfficiency

// cryptomarketers.eth, 0x5p6q...7r8s, Crypto Marketers, We are a team of marketing professionals catering to the specific needs of blockchain startups, #marketing

// decentralDesigners.eth, 0x8s9t...0u1v, Decentral Designers, We are a collective of designers bringing user-friendly interfaces to decentralized platforms, #design #UX/UI