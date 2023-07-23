import * as _ from 'lodash';
import { Delegate } from "../delegates/page";
import Link from 'next/link';
import { BY_DOMAIN_TAG, withDomainImageUrl } from '../assets';
import Image from "next/image";
import { asReadibleHex } from '../util';
import { PROPOSALS } from '../proposal';

export const DelegateCard = ({ delegate, onDelegateClick, style = 'human' }: { delegate: Delegate, onDelegateClick: (address: string) => void, style?: string }) => {

    const { name, title, description, ens, address, isDelegating, domainTags = [] } = delegate;

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white text-black">

            <div className="text-center pt-3">
                <img
                    src={delegate?.imageUrl}
                    className="mx-auto mb-4 w-24 rounded-lg"
                    alt="Avatar" />
                <h5 className="mb-2 text-xl font-medium leading-tight">{name} </h5>
                {asReadibleHex(address)}
                <div>
                    {
                        delegate?.isDelegating &&
                        (
                            <span
                                className="inline-block whitespace-nowrap rounded-[0.27rem] bg-french-blue text-white px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-primary-700"
                            >Futher delegates</span>
                        )
                    }
                </div>

                <p className="text-neutral-500 dark:text-neutral-400">{title}</p>
            </div>
            <div className="px-6 m-0">
                <p className="text-gray-700 text-xs">
                    {description}
                </p>
            </div>
            <div className="px-4 pt-2 m-0">
                {
                    domainTags.map((domainTag, index) => {
                        const domainImageUrl = withDomainImageUrl(BY_DOMAIN_TAG[domainTag]);

                        return (
                            <>
                                {style === 'nouns' && (
                                    <span className="inline-block">
                                        <Image
                                            src={domainImageUrl}
                                            width={15}
                                            height={8}
                                            className="w-full dark:hidden w-10 h-4"
                                            alt={domainTag}
                                        />
                                    </span>
                                )}

                                <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700">#{domainTag}</span>
                            </>
                        )
                    })

                }
            </div>


            <div className="text-center pt-2">
                <Link href="/delegates#delegate-attestion" scroll={false}>
                    <button
                        onClick={onDelegateClick.bind(this, delegate.address)}
                        className="bg-french-red p-2 m-2">Delegate</button>
                </Link>
            </div>


        </div >
    )

}

export default DelegateCard;