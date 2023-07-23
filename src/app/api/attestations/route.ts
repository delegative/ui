import { queryGraphql } from "@/app/graph-service";
import { NextResponse } from "next/server";
import { getAttestationsWithAddress } from "../get_attestations_from_address";

const THE_GRAPH_API_KEY = process.env.THE_GRAPH_API_KEY;
const baseURL = `https://gateway.thegraph.com/api/${THE_GRAPH_API_KEY}/subgraphs/id/EKYuDy59ZZvn82cJkpbtSWtkJJap5qDongmpNz3xcRZc`

  export async function GET(req: Request) {
    
    const { searchParams } = new URL(req.url);
    const address = searchParams.get('address')
    if(!address){
     
    return NextResponse.json({}, { status: 200 });
    }

   const results = await getAttestationsWithAddress(address);

    console.log('results', results)

    return NextResponse.json(results, { status: 200 });


  }
  