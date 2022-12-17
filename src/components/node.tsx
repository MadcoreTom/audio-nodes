import * as React from "react";
import { AnyControlTemplate, DialControlTemplate, NODE_TEMPLATES } from "../nodes/templates";
import { joinWire, mouseSelect, Node } from "../state/store";
import { DialControl } from "./dial.control";
import { OptionControl } from "./option.control";
import { useDispatch } from "react-redux";

export function NodeElem(props: { data: Node, idx: number }) {
    const dispatch = useDispatch();

    const n = props.data;
    const template = NODE_TEMPLATES[n.template];
    if (!template) {
        return null;
    }
    const transform = `translate(${n.x},${n.y})`;

    const controls = template.controls.map((c, i) => <Control {...c} value={n.controlValues[i]} key={i} />)

    let inputs: JSX.Element[] | null = null;
    if (template.inputs.length > 0) {
        const step = template.height / (template.inputs.length + 1);
        inputs = template.inputs.map((inp, idx) => <InputConnector y={(idx + 1) * step} name={inp.name}
            onMouseDown={() => dispatch(mouseSelect({ type: "wire", isInput: true, nodeIdx: props.idx, ioIdx: idx }))}
            onMouseUp={() => dispatch(joinWire({ isInput: true, nodeIdx: props.idx, ioIdx: idx }))}
        />)
    }

    let outputs: JSX.Element[] | null = null;
    if (template.outputs.length > 0) {
        const step = template.height / (template.outputs.length + 1);
        outputs = template.outputs.map((inp, idx) => <OutputConnector x={template.width} y={(idx + 1) * step} name={inp.name}
            onMouseDown={() => dispatch(mouseSelect({ type: "wire", isInput: false, nodeIdx: props.idx, ioIdx: idx }))}
            onMouseUp={() => dispatch(joinWire({ isInput: false, nodeIdx: props.idx, ioIdx: idx }))}
        />)
    }

    return <g transform={transform}>
        <rect x="0" y="0" width={template.width} height={template.height} stroke="#ff4f69" rx="10" ry="10"
            onMouseDown={evt => dispatch(mouseSelect({ type: "node", idx: props.idx }))} />
        {controls}
        {inputs}
        {outputs}
    </g>

}

function Control(props: AnyControlTemplate & { value: any }) {
    switch (props.type) {
        case "dial":
            return <DialControl {...props as DialControlTemplate} value={props.value} />
        case "option":
            return <OptionControl {...props} value={props.value} />
    }
}

function InputConnector(props: { y: number, name: string, onMouseDown: () => {}, onMouseUp: () => {} }) {
    return <g>
        <circle cx="0" cy={props.y} r="5" stroke="#49e7ec" onMouseDown={props.onMouseDown} onMouseUp={props.onMouseUp} />
        <text x="5" y={props.y + 4} fill="#49e7ec" fontSize="12px">{props.name.toUpperCase()}</text>
    </g>
}

function OutputConnector(props: { x: number, y: number, name: string, onMouseDown: () => {}, onMouseUp: () => {} }) {
    return <g>
        <circle cx={props.x} cy={props.y} r="5" stroke="#49e7ec" onMouseDown={props.onMouseDown} onMouseUp={props.onMouseUp} />
        <text x={props.x - 5} y={props.y + 4} fill="#49e7ec" fontSize="12px" textAnchor="end">{props.name.toUpperCase()}</text>
    </g>
}