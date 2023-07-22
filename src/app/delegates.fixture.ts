import * as _ from 'lodash';
import { Delegate } from "./delegates/page";


export const DELEGATES_FIXTURE_RAW = [
    {
        address: '0x1',
        name: 'Crypto 6729',
        title: 'cofounder at pg',
        ownVotingPower: 12,
        totalVotingPower: 24
    },
    {
        address: '0x2',
        name: 'John Doe',
        title: 'cofounder at pg',
        ownVotingPower: 21,
        totalVotingPower: 55
    },
    {
        address: '0x3',
        name: 'Nanny Doe',
        title: 'Director at ABC foundation',
        isDelegating: true,
        ownVotingPower: 21,
        totalVotingPower: 55
    },
    {
        address: '0x4',
        name: 'Ar Doe',
        title: 'Director at DEF foundation',
        ownVotingPower: 21,
        totalVotingPower: 55
    },
    {
        address: '0x5',
        name: 'Punk',
        title: 'Director at ZZZ foundation',
        ownVotingPower: 21,
        totalVotingPower: 55
    }
] as  Delegate[];

export const DELEGATES_FIXTURE = DELEGATES_FIXTURE_RAW.map((delegate, index)=>{

    return {
        ...delegate,
        imageUrl: `https://tecdn.b-cdn.net/img/new/avatars/${_.random(0, 8)}.webp`
    }
})
