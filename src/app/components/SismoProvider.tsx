import { SismoConnectResponse, SismoConnectVerifiedResult } from "@sismo-core/sismo-connect-server";
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
    const verifiedResult = await fetch("/api/verify", {
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

        setSismoState({
            status: SismoStatus.Verifying,
            response
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