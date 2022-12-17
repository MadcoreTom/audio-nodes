import * as React from "react";
import { OptionControlTemplate } from "../nodes/templates";

export function OptionControl(props: OptionControlTemplate & {value:string}) {
    const transform = `translate(${props.x},${props.y})`;

    return <g transform={transform}>
        <rect x="0" y="0" width="60" height="20" stroke="red" rx="10" ry="10" />
        <text textAnchor="middle" x="30" y="14" fill="yellow" fontSize="12px">{props.value}</text>
    </g>

}
