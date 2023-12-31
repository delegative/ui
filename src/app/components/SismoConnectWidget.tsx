"use client";

import { useContext, useState } from "react";
import {
    SismoConnectButton,
    SismoConnectProof,
    SismoConnectResponse,
    SismoConnectVerifiedResult,
} from "@sismo-core/sismo-connect-react";
import {
    CONFIG,
    AUTHS,
    CLAIMS,
    SIGNATURE_REQUEST,
    AuthType,
    ClaimType,
} from "../sismo-connect-config";
import { SismoContext, SismoStatus } from "./SismoProvider";
import { VotingPowerWidget } from "./VotingPowerWidget";
import { GoveranceContext } from "./GoveranceProvider";
import { asReadibleHex } from "../util";

export const findAuthUserId = (proofs: SismoConnectProof[]) => {
    let userId = '';
    proofs.forEach((proof) => {
        (proof.auths || []).forEach((auth) => {
            if (auth.authType === AuthType.EVM_ACCOUNT) {
                userId = auth.userId!;
                return;
            }
        });
    });

    return userId;

}

export const SismoConnectWidget = () => {
    const { sismoState, onResponse } = useContext(SismoContext);
    const [sismoConnectVerifiedResult, setSismoConnectVerifiedResult] =
        useState<SismoConnectVerifiedResult>();

    const { votingPowerEligible, votingPowerAggregated } = useContext(GoveranceContext);

    if (sismoState.status === SismoStatus.Verifying) {

        const { userId } = sismoState;

        return (
            <div className="grid">
                <div className="align-middle col-span-1">
                    <VotingPowerWidget
                        votingPowerEligible={votingPowerEligible}
                        votingPowerAggregated={votingPowerAggregated} />
                </div>
                <button className="bg-french-blue text-xs  col-span-1 m-1">
                    {asReadibleHex(userId)}
                </button>
            </div >
        )

    }

    return (
        <SismoConnectButton
            config={CONFIG}
            // Auths = Data Source Ownership Requests. (e.g Wallets, Github, Twitter, Github)
            auths={AUTHS}
            // Claims = prove group membership of a Data Source in a specific Data Group.
            // (e.g ENS DAO Voter, Minter of specific NFT, etc.)
            // Data Groups = [{[dataSource1]: value1}, {[dataSource1]: value1}, .. {[dataSource]: value}]
            // Existing Data Groups and how to create one: https://factory.sismo.io/groups-explorer
            claims={CLAIMS}
            // Signature = user can sign a message embedded in their zk proof
            signature={SIGNATURE_REQUEST}
            text="Connect Sismo"
            // Triggered when received Sismo Connect response from user data vault
            onResponse={async (response: SismoConnectResponse) => {
                onResponse(response)
            }}
        />
    )
}