// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { SismoConnect, SismoConnectVerifiedResult } from "@sismo-core/sismo-connect-server";
import { NextResponse } from "next/server";
import { AUTHS, CLAIMS, CONFIG, SIGNATURE_REQUEST } from "../../sismo-connect-config.ts";

const sismoConnect = SismoConnect({ config: CONFIG });

export async function POST(req: Request) {
  const { sismoConnectResponse, vote} = await req.json();
  try {
    const result: SismoConnectVerifiedResult = await sismoConnect.verify(sismoConnectResponse, {
      auths: AUTHS,
      claims: CLAIMS,
      signature: SIGNATURE_REQUEST,
    });

    // submit vote to ipfs encrypted via lighthouse

    return NextResponse.json(result, { status: 200 });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(e.message, { status: 500 });
  }
}
