import * as React from "react";
import { DialControlTemplate } from "../nodes/templates";

export function DialControl(props: DialControlTemplate & {value:number}) {
    const transform = `translate(${props.x},${props.y})`;

    const range = props.max - props.min;
    const v = (props.value - props.min)/range;
    const dial = [
        20+18 * Math.sin(v*Math.PI),
        20+18 * Math.cos(v*Math.PI)
    ]

    return <g transform={transform}>
        <rect x="0" y="0" width="40" height="60" stroke="red" rx="10" ry="10" />
        <circle cx="20" cy="20" r="18" stroke="limegreen"/>
        <line x1="20" y1="20" x2={dial[0]} y2={dial[1]} stroke="magenta"/>
        <text textAnchor="middle" x="20" y="55" fill="yellow" fontSize="12px">{props.label + props.value}</text>
    </g>

}
