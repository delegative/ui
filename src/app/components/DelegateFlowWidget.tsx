import ReactFlow, { Controls, Background, MarkerType, EdgeText } from 'reactflow';
import 'reactflow/dist/style.css';
import { Delegate } from '../delegates/page';
import { DELEGATES_FIXTURE } from '../delegates.fixture';
import { asReadibleHex } from '../util';



// alternatively use treemap to visualize https://github.com/d3/d3-hierarchy#treemap
// ensure voting is the after processed
export const createLabel = (address: string, imageUrl: string, name: string, votingPowerEligible: number, votingPowerAggregated: number) => {

    return <div className="grid grid-cols-6 gap-1">
        <div className="col-span-2">
            <img
                src={imageUrl}
                className="w-8 rounded-full"
                alt="Avatar" />
            <span className="text-gray-700 text-xs text-bold">
                🎫 {votingPowerEligible}/Σ{votingPowerAggregated}
            </span>
        </div>
        <div className="col-span-3">
            <h4 className="pb-1">{name}</h4>
            <span className="text-gray-700">
                {asReadibleHex(address)}

            </span>

        </div>



    </div>
}

export const mapDelegateAsNode = (delegate: Delegate, index: number, votingWeightAggregated: number) => {
    return {
        id: delegate.address || 'null',
        data: { label: createLabel(delegate.address, delegate.imageUrl, delegate.name, delegate.votingPowerEligible || 0, votingWeightAggregated) },
        position: { x: 0 + index * 80, y: index % 3 * 150 },
        // type: 'input',
    };
}

export const mapDelegationAsEdge = (source: string, target: string, votingPower: number) => {
    return {
        id: `${source}-${target}`,
        source, target,
        animated: true,
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
        label: `🎫 +${votingPower}`
    }

}

// TODO fix once we confirm actual data structure


const connectionLineStyle = { stroke: 'white' };


export const DelegateFlowWidget = ({ delegates, delegations, votingWeightByAddress }: { delegates: Delegate[], delegations: { source: string, target: string }[], votingWeightByAddress: any }) => {

    const nodes = delegates.map((d, i) => mapDelegateAsNode(d, i, votingWeightByAddress[d.address]))

    const edges = delegations.map(({ source, target }) => {
        // temp hack
        const matched = DELEGATES_FIXTURE.find(({ address }) => address === source);

        const votingPowerAggregated = votingWeightByAddress[source];


        return mapDelegationAsEdge(source, target, votingPowerAggregated);

    })
    return (
        <div className="h-5/6 min-h-screen w-100">
            <ReactFlow fitView nodes={nodes} defaultEdges={edges} connectionLineStyle={connectionLineStyle}>
                <Background />

                {/* <Controls /> */}
            </ReactFlow>
        </div>
    );
}


export default DelegateFlowWidget