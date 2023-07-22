import ReactFlow, { Controls, Background, MarkerType, EdgeText } from 'reactflow';
import 'reactflow/dist/style.css';
import { Delegate } from '../delegates/page';
import { DELEGATES_FIXTURE } from '../delegates.fixture';

const delegations = [
    { source: '1', target: '2' },
    { source: '2', target: '3' },
    { source: '4', target: '5' }
]

// alternatively use treemap to visualize https://github.com/d3/d3-hierarchy#treemap

export const createLabel = (address: string, name: string) => {

    return <div>
        <div>
            {name}
        </div>
        <h4 className="text-gray-700">
            0x{address}
        </h4>

    </div>
}

export const mapDelegateAsNode = (delegate: Delegate, index: number) => {
    return {
        id: delegate.address || 'null',
        data: { label: createLabel(delegate.address, delegate.name) },
        position: { x: 0 + index * 100, y: index * 100 },
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
            flow
            <ReactFlow nodes={nodes} defaultEdges={edges} fitView connectionLineStyle={connectionLineStyle}>
                <Background />

                {/* <Controls /> */}
            </ReactFlow>
        </div>
    );
}


export default DelegateFlowWidget