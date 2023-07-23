import { queryGraphql } from "@/app/graph-service";
import { NextResponse } from "next/server";



  export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const proposalId = searchParams.get('proposalId')

    // retrieve mina results in ipfs id

    const results = {
        for: 212,
        against: 23,
        ipfsCid: 'QmQS1L8X8TkNtCVKdGm7bTqVfnzbDqEURC9mocvsKaeWW4'
    }

    return NextResponse.json(results, { status: 200 });


  }
  