export const attestDelegation =  async (address: string)=>{

    console.log('attest', address);

    const body = {
        address
    }

    const verifiedResult = await fetch("/api/delegate", {
        method: "POST",
        body: JSON.stringify(body),
    });
    const data = await verifiedResult.json();
 
    console.log('data')
    
}