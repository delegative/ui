import { queryGraphql } from "@/app/graph-service";
import { NextResponse } from "next/server";

  export async function GET(req: Request) {
    
    // retrieve mina results

    const results = {
        for: 212,
        against: 23
    }

    return NextResponse.json(results, { status: 200 });


  }
  