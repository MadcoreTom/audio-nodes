import * as React from "react";
import { DialControlTemplate } from "../nodes/templates";
import { useDispatch } from "react-redux";
import { mouseSelect } from "../state/store";
import { SOUND } from "../soundsystem";

const START_ANGLE = Math.PI/4;
const ANGLE_RANGE = Math.PI*6/4;
const START_MARK = [
    20+18 * Math.sin(START_ANGLE+ANGLE_RANGE),
    20+18 * Math.cos(START_ANGLE+ANGLE_RANGE),
    20+24 * Math.sin(START_ANGLE+ANGLE_RANGE),
    20+24 * Math.cos(START_ANGLE+ANGLE_RANGE)
]
const END_MARK = [
    20+18 * Math.sin(START_ANGLE),
    20+18 * Math.cos(START_ANGLE),
    20+24 * Math.sin(START_ANGLE),
    20+24 * Math.cos(START_ANGLE)
]


export function DialControl(props: DialControlTemplate & {value:number, nodeIdx:number}) {
    const dispatch = useDispatch();
    const transform = `translate(${props.x},${props.y})`;

    const range = props.max - props.min;
    const v = (props.value - props.min)/range;
    const dial = [
        20+18 * Math.sin(START_ANGLE+(1-v)*ANGLE_RANGE),
        20+18 * Math.cos(START_ANGLE+(1-v)*ANGLE_RANGE)
    ]

    return <g transform={transform}>
        <rect x="0" y="0" width="40" height="60" stroke="#ff8142" rx="10" ry="10" />
        <circle cx="20" cy="20" r="18" stroke="#ffda45" onMouseDown={()=>dispatch(mouseSelect({type:"control",nodeIdx:props.nodeIdx, label:props.label}))}/>
        <line x1="20" y1="20" x2={dial[0]} y2={dial[1]} stroke="#ffda45"/>
        <line x1={START_MARK[0]} y1={START_MARK[1]} x2={START_MARK[2]} y2={START_MARK[3]} stroke="#ff8142"/>
        <line x1={END_MARK[0]} y1={END_MARK[1]} x2={END_MARK[2]} y2={END_MARK[3]} stroke="#ff8142"/>
        <text textAnchor="middle" x="20" y="55" fill="#ff8142" fontSize="12px">{props.label}</text>
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