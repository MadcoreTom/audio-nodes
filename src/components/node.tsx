import * as React from "react";
import { AnyControlTemplate, DialControlTemplate, NODE_TEMPLATES } from "../nodes/templates";
import { Node } from "../state/store";
import { DialControl } from "./dial.control";

export function NodeElem(props: { data: Node }) {
    const n = props.data;
    const template = NODE_TEMPLATES[n.template];
    if (!template) {
        return null;
    }
    const transform = `translate(${n.x},${n.y})`;

    const controls = template.controls.map((c,i) => <Control {...c} value={n.controlValues[i]} key={i}/>)


    return <g transform={transform}>
        <rect x="0" y="0" width={template.width} height={template.height} stroke="red" rx="10" ry="10" />
        {controls}
    </g>

}

function Control(props: AnyControlTemplate & {value:any}) {
    switch (props.type) {
        case "dial":
            return <DialControl {...props as DialControlTemplate} value={props.value} />
    }
    return null;
}