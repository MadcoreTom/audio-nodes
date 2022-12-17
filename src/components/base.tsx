import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NODE_TEMPLATES } from "../nodes/templates";
import { mouseSelect, Node, drag, RootState } from "../state/store";
import { NodeElem } from "./node";

export function Base() {
    let nodes = useSelector((state: RootState) => state.main.nodes) as Node[];
    let wires = useSelector((state: RootState) => state.main.wires);
    let offset = useSelector((state: RootState) => state.main.offset);
    const dispatch = useDispatch();

    const transform = `translate(${offset[0]},${offset[1]})`


    return <svg width="100" height="100"
        onMouseDown={evt => dispatch(mouseSelect({ type: "everything" }))}
        onMouseUp={evt => dispatch(mouseSelect(null))}
        onMouseMove={evt => dispatch(drag([evt.movementX, evt.movementY, evt.clientX, evt.clientY]))}
        style={{ backgroundPosition: `${offset[0]}px ${offset[1]}px` }}>
        <g transform={transform}>
            {nodeElems(nodes)}
            <TempWire />
            {wires.map((w,i) => <Wire {...w} key={i}/>)}
        </g>
    </svg>

}

function nodeElems(nodes: Node[]) {
    return nodes.map((n, i) => {
        return <NodeElem data={n} key={i} idx={i} />
    });
}

function TempWire() {
    let nodes = useSelector((state: RootState) => state.main.nodes) as Node[];
    let dragTarget = useSelector((state: RootState) => state.main.dragTarget);
    let offset = useSelector((state: RootState) => state.main.offset);
    let mousePos = useSelector((state: RootState) => state.main.mousePos);
    if (dragTarget && dragTarget.type == "wire") {
        const node = nodes[dragTarget.nodeIdx];
        const template = NODE_TEMPLATES[node.template];
        const y = dragTarget.isInput ?
            (dragTarget.ioIdx + 1) / (template.inputs.length + 1) * template.height :
            (dragTarget.ioIdx + 1) / (template.outputs.length + 1) * template.height;
        const x = dragTarget.isInput ? 0 : template.width;
       return <line
            x1={x + node.x}
            y1={y + node.y}
            x2={mousePos[0] - offset[0]}
            y2={mousePos[1] - offset[1]}
            stroke="#fff7f8"
            strokeDasharray="5,5"
            style={{pointerEvents:"none"}}
        />
    }
    return null;
}

function Wire(props: { outNode: number, outIdx: number, inNode: number, inIdx: number }) {
    let nodes = useSelector((state: RootState) => state.main.nodes) as Node[]; // TODO just reference by idx?

    const outputNode = nodes[props.outNode];
    const outputTemplate = NODE_TEMPLATES[outputNode.template];
    const outX = outputTemplate.width + outputNode.x;
    const outY = ((props.outIdx + 1) / (outputTemplate.outputs.length + 1) ) * outputTemplate.height+ outputNode.y;


    const inputNode = nodes[props.inNode];
    const inputTemplate = NODE_TEMPLATES[inputNode.template];
    const inX = inputNode.x;
    const inY = ((props.inIdx + 1) / (inputTemplate.inputs.length + 1)) *inputTemplate.height+ inputNode.y;

console.log(inY,outY)
    return <line
    x1={outX }
    y1={outY }
    x2={inX}
    y2={inY}
    stroke="#fff7f8"
/>

}