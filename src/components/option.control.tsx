import * as React from "react";
import { useDispatch } from "react-redux";
import { OptionControlTemplate } from "../nodes/templates";
import { setControlValue } from "../state/store";

export function OptionControl(props: OptionControlTemplate & { value: string, nodeIdx: number }) {
    const dispatch = useDispatch();

    const transform = `translate(${props.x},${props.y})`;

    const onClick = () => dispatch(
        setControlValue({
            value: props.options[(props.options.indexOf(props.value) + 1) % props.options.length],
            label: props.label,
            nodeIdx: props.nodeIdx
        })
    );

    return <g transform={transform} onClick={onClick}>
        <rect x="0" y="0" width="60" height="20" stroke="#ff8142" rx="10" ry="10" />
        <text textAnchor="middle" x="30" y="14" fill="#ffda45" fontSize="12px">{props.value}</text>
    </g>

}
