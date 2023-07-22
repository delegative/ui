import ReactFlow, { Controls, Background, MarkerType, EdgeText } from 'reactflow';
import 'reactflow/dist/style.css';
import { Delegate } from '../delegates/page';
import { DELEGATES_FIXTURE } from '../delegates.fixture';

const delegations = [
    { source: '0x1', target: '0x2' },
    { source: '0x2', target: '0x3' },
    { source: '0x4', target: '0x5' }
]

// alternatively use treemap to visualize https://github.com/d3/d3-hierarchy#treemap

export const createLabel = (address: string, imageUrl: string, name: string) => {

    return <div className="grid grid-cols-6 gap-1">
        <div className="col-span-2">
            <img
                src={imageUrl}
                className="w-8 rounded-full"
                alt="Avatar" />
        </div>
        <div className="col-span-3">
            <h4 className="pb-1">{name}</h4>
            <span className="text-gray-700">
                {address}
            </span>
        </div>



    </div>
}

export const mapDelegateAsNode = (delegate: Delegate, index: number) => {
    return {
        id: delegate.address || 'null',
        data: { label: createLabel(delegate.address, delegate.imageUrl, delegate.name) },
        position: { x: 0 + index * 100, y: index % 3 * 100 },
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
        label: `🎫 ${votingPower}+`
    }

}

// TODO fix once we confirm actual data structure

const edges = delegations.map(({ source, target }) => {
    // temp hack
    const matched = DELEGATES_FIXTURE.find(({ address }) => address === source);
    const votingPower = matched?.totalVotingPower || 0;

    return mapDelegationAsEdge(source, target, votingPower);

})

const connectionLineStyle = { stroke: 'white' };

const nodes = DELEGATES_FIXTURE.map(mapDelegateAsNode)

console.log('nodes', nodes, delegations)

export const DelegateFlowWidget = () => {
    return (
        <div className="h-5/6 min-h-screen w-screen">
            <ReactFlow nodes={nodes} defaultEdges={edges} fitView connectionLineStyle={connectionLineStyle}>
                <Background />

                {/* <Controls /> */}
            </ReactFlow>
        </div>
    );
}


export default DelegateFlowWidget