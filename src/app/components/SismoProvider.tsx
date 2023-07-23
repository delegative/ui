import { AuthType, SismoConnectProof } from "@sismo-core/sismo-connect-react";
import { SismoConnectResponse, SismoConnectVerifiedResult } from "@sismo-core/sismo-connect-server";
import { getAddress } from "ethers";
import { createContext, useState } from "react";
// import { SismoState } from "../page";


export enum SismoStatus {
    Init = "init",
    Verifying = "verifying",
    Verified = "verified",
    Error = "error"
}


export type SismoState = {
    status: SismoStatus;
    userId?: string;
    verifyResult?: SismoConnectVerifiedResult;
    response?: SismoConnectResponse;
}

export const SismoContext = createContext<{
    sismoState: SismoState;
    onResponse: (response: SismoConnectResponse) => void;
}>({
    sismoState: {
        status: SismoStatus.Init,
    },
    onResponse: async () => { }
});

export const verify = async (response: SismoConnectResponse) => {
    const verifiedResult = await fetch("/api/vote", {
        method: "POST",
        body: JSON.stringify(response),
    });
    const data = await verifiedResult.json();
    if (verifiedResult.ok) {
        return {
            verifyResult: data,
            status: SismoStatus.Verified
        }
    } else {
        return {
            verifyResult: null,
            error: data,
            status: SismoStatus.Error
        }
    }
}

// note this addres is not checksumed
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

    return getAddress(userId);

}

export const SismoWrapper = ({ children }: { children: React.ReactNode }) => {
    // const [sismoConnectVerifiedResult, setSismoConnectVerifiedResult] =
    //     useState<SismoConnectVerifiedResult>();
    const [sismoConnectResponse, setSismoConnectResponse] = useState<SismoConnectResponse>();
    const [sismoState, setSismoState] = useState<SismoState>({
        status: SismoStatus.Init
    });

    const onResponse = async (response: SismoConnectResponse) => {
        console.log('response', response);
        setSismoConnectResponse(response);


        const userId = findAuthUserId(response?.proofs || []) || '';

        setSismoState({
            status: SismoStatus.Verifying,
            response,
            userId
        })

        const { status, verifyResult } = await verify(response);

        setSismoState({
            verifyResult,
            status: status
        })
    }

    return (
        <SismoContext.Provider value={
            {
                sismoState,
                // sismoConnectVerifiedResult: null,
                onResponse
            }
        }>
            test
            {children}
        </SismoContext.Provider>
    )

}