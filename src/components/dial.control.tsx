import * as React from "react";
import { DialControlTemplate } from "../nodes/templates";
import { useDispatch } from "react-redux";
import { mouseSelect } from "../state/store";
import { SOUND } from "../soundsystem";

export function DialControl(props: DialControlTemplate & {value:number, nodeIdx:number}) {
    const dispatch = useDispatch();
    const transform = `translate(${props.x},${props.y})`;

    const range = props.max - props.min;
    const v = (props.value - props.min)/range;
    const dial = [
        20+18 * Math.sin(v*Math.PI),
        20+18 * Math.cos(v*Math.PI)
    ]

    return <g transform={transform}>
        <rect x="0" y="0" width="40" height="60" stroke="#ff8142" rx="10" ry="10" />
        <circle cx="20" cy="20" r="18" stroke="#ffda45" onMouseDown={()=>dispatch(mouseSelect({type:"control",nodeIdx:props.nodeIdx, label:props.label}))}/>
        <line x1="20" y1="20" x2={dial[0]} y2={dial[1]} stroke="#ffda45"/>
        <text textAnchor="middle" x="20" y="55" fill="#ff8142" fontSize="12px">{props.label + props.value}</text>
    </g>

}

export function createDialControl(x:number,y:number,label:string,min:number,max:number, getNodeParam:(nodeIdx:number)=>AudioParam):DialControlTemplate{
    const step = (max-min)/250;
    return {
        type: "dial",
        x,
        y,
        label,
        min,
        max,
        onDrag: (delta: number, nodeIdx: number, curValue:number) => {
            // const node = (SOUND.getNode("" + nodeIdx) as OscillatorNode);
            const value = Math.min(max,Math.max(min,curValue + delta*step));
            // node.frequency.setValueAtTime(value, SOUND.now() + 0.001);
            getNodeParam(nodeIdx).setValueAtTime(value, SOUND.now() + 0.001);
            return value;
        }
    }
}