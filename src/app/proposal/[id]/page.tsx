"use client";
import React, { useContext, useEffect } from 'react';
import { PROPOSALS } from '../../proposal';
import Link from 'next/link';

export default function Page({ params }: { params: { id: string } }) {

    return (
        <ul>
            proposal {params?.id}

        </ul>
    )
}