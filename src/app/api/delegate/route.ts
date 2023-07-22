// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextResponse } from "next/server";


export async function POST(req: Request) {
 // TODO

    console.log('attest delegate');
    
    return NextResponse.json({}, { status: 200 });
    
}


export async function DELETE(req: Request) {
    // TODO
    console.log('revoke')
    
    return NextResponse.json({}, { status: 200 });
    
}
