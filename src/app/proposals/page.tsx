"use client";
import React, { useContext, useEffect } from 'react';
import { PROPOSALS } from '../proposal';
import Link from 'next/link';

export default function Page() {

    return (
        <main className="main">
            <section>
                <ul>
                    {
                        PROPOSALS.map(proposal => {
                            return (
                                <li className="m-2">
                                    <div className="p-2 bg-white text-black">
                                        <Link href={`/proposal/${proposal.id}`}>
                                            {proposal.title}
                                        </Link>
                                    </div>
                                </li>
                            )
                        })
                    }

                </ul>
            </section>
        </main>
    )
}