import { envelopeTemplate } from "./envelope.template";
import { gainTemplate } from "./gain.template";
import { lfoTemplate, hfoTemplate } from "./osc.template";
import { outTemplate } from "./out.template";
import { padTemplate } from "./pad.template";

export type OutputConnector = { type: "wave", name: string, getParam?: (myId: number) => AudioNode } | { type: "trigger", name: string };
export type InputConnector = { type: "control", name: string, trigger: (time: number, myId:number, controlValues:any[]) => void } | { type: "wave", name: string, onJoin?: (input: AudioNode, myId: number) => any };

export type NodeTemplate = {
    width: number,
    height: number,
    controls: AnyControlTemplate[],
    defaultControlValues: any[], // TODO move to controls
    inputs: InputConnector[],
    outputs: OutputConnector[],
    onCreate?: (idx:number)=>any
    // TODO and more
}

export const NODE_TEMPLATES: { [id: string]: NodeTemplate } = {
    gain: gainTemplate,
    LFO: lfoTemplate,
    HFO: hfoTemplate,
    out: outTemplate,
    pad: padTemplate,
    env: envelopeTemplate,
}


export type ControlTemplate = {
    y: number,
    x: number,
    label: string,
    type: string,
    onChange?:(value:any, nodeIdx:number)=>void,
    onDrag?:(delta:number, nodeIdx:number, curValue:number)=>number
}

export type DialControlTemplate = ControlTemplate & {
    type: "dial",
    min: number,
    max: number
}

export type OptionControlTemplate = ControlTemplate & {
    type: "option",
    options: string[]
}

export type AnyControlTemplate = DialControlTemplate | OptionControlTemplate;
