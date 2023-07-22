import _ from 'lodash'

export const BY_DOMAIN_TAG = {
    'software': 'black-rgb',
    'hardware': 'blue-med-saturated',
    'finance': 'fullblack',
    'legal': 'grey',
    'accounting': 'hip-rose',
    'engineering': 'hip-rose',
    'IoT': 'hip-rose',
    'blockchain': 'hip-rose',
    'venturecapital': 'blue-med-saturated',
    'DAppDevelopment': 'fullblack',
    'energyEfficiency': 'grey-light',
    'law': 'pink-purple-multi',
    'regulations': 'pink-purple-multi',
    'education': 'smoke',
    'marketing': 'grey-light',
    'startups': 'smoke',
    'economics': 'smoke',
    'environment': 'watermelon',
    'business': 'magenta'
} as {[key: string]: string}

export const withDomainImageUrl = (key: string)=>{
    return '/'+key+'320px.png';
}

export const HEAD_TAGS = [
    'microwave',
    'maze',
    'mailbox',
    'chameleon',
    'mirror',
    'chain',
    'ape',
    'blackhole',
    'bat'
]

export const withHeadImageUrl = ()=>{
    const key = _.first(_.shuffle(HEAD_TAGS));
    
    return '/head-'+key+'.svg';
}
