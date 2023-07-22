import { queryGraphql } from "@/app/graph-service";
import { NextResponse } from "next/server";

const THE_GRAPH_API_KEY = process.env.THE_GRAPH_API_KEY;
const baseURL = `https://gateway.thegraph.com/api/${THE_GRAPH_API_KEY}/subgraphs/id/EKYuDy59ZZvn82cJkpbtSWtkJJap5qDongmpNz3xcRZc`

  export async function GET(req: Request) {

    const queryObject = {
      query: `
        holders(first: 5, block: { number: 17750552 }) {
          id
          address
          balance
          token {
            id
          }
        }
        tokens(first: 5) {
          id
          address
          totalSupply
          holders
        }
      `      ,
      variables: null
    }
    
  const res =  await queryGraphql(baseURL, queryObject);


    return NextResponse.json({a:1}, { status: 200 });
    

  }
  