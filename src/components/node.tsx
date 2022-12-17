import * as React from "react";
import { AnyControlTemplate, DialControlTemplate, NODE_TEMPLATES } from "../nodes/templates";
import { Node } from "../state/store";
import { DialControl } from "./dial.control";
import { OptionControl } from "./option.control";

export function NodeElem(props: { data: Node }) {
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
        inputs = template.inputs.map((inp, idx) => <InputConnector y={(idx + 1) * step} name={inp.name} />)
    }

    let outputs: JSX.Element[] | null = null;
    if (template.outputs.length > 0) {
        const step = template.height / (template.outputs.length + 1);
        outputs = template.outputs.map((inp, idx) => <OutputConnector x={template.width} y={(idx + 1) * step} name={inp.name} />)
    }

    return <g transform={transform}>
        <rect x="0" y="0" width={template.width} height={template.height} stroke="red" rx="10" ry="10" />
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
    return null;
}

function InputConnector(props: { y: number, name: string }) {
    return <g>
        <circle cx="0" cy={props.y} r="5" stroke="pink" />
        <text x="5" y={props.y + 4} fill="pink" fontSize="12px">{props.name.toUpperCase()}</text>
    </g>
}

function OutputConnector(props: { x: number, y: number, name: string }) {
    return <g>
        <circle cx={props.x} cy={props.y} r="5" stroke="beige" />
        <text x={props.x - 5} y={props.y + 4} fill="beige" fontSize="12px" textAnchor="end">{props.name.toUpperCase()}</text>
    </g>
}