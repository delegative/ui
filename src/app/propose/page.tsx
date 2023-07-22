"use client";
import React from 'react'

import ReactFlow, { Controls, Background, MarkerType, EdgeText } from 'reactflow';
import 'reactflow/dist/style.css';

import Select from 'react-select'

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

const CriteriaSelectorNode = () => (
    <div className="text-xs w-100 text-black bg-white">
        criteria
        <div className="w-100">
            <Select options={options} />
        </div>
    </div>
)

const nodeTypes = {

    criteriaSelectorNode: CriteriaSelectorNode

}

export default function Page() {


    const nodes = [{
        id: 'style',
        data: { label: 'Proposal Style - Yes/No' },
        position: { x: -100, y: 0 },
    },
    {
        id: 'eligibility',
        data: { label: 'Eligibility' },
        position: { x: 100, y: 10 },
    },
    {
        id: 'eligibility-erc20',
        data: { label: 'Criteria - erc20' },
        position: { x: 300, y: -100 },
        type: 'criteriaSelectorNode',
        dragging: true,
        // class: 'nodrag'
    },
    {
        id: 'eligibility-erc721',
        data: { label: 'Criteria - erc721' },
        position: { x: 300, y: 100 },
    },
    {
        id: 'election-time',
        data: { label: 'Election Time' },
        position: { x: 0, y: 100 },
        type: 'input'
    }
    ];

    const edges = [
        {
            id: '1-2',
            source: 'style',
            target: 'election-time'
        },
        {
            id: 'eligibility-erc20',
            source: 'eligibility-erc20',
            target: 'eligibility'
        },
        {
            id: 'eligibility-erc721',
            source: 'eligibility-erc721',
            target: 'eligibility'
        }
    ];



    const connectionLineStyle = { stroke: 'white' };

    return (
        <div >
            Propose

            <section>
                <h2>Configure your proposal</h2>
                <div className="h-60 h-5/6 min-h-screen w-screen">
                    <ReactFlow id="2"

                        nodeTypes={nodeTypes}
                        nodes={nodes} edges={edges} fitView connectionLineStyle={connectionLineStyle} >
                        <Background />
                        <Controls />
                    </ReactFlow>
                </div>
            </section>
        </div>
    )
}