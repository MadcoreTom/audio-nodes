import { SOUND } from "../soundsystem";
import { gainTemplate } from "./gain.template";
import { oscTemplate } from "./osc.template";
import { outTemplate } from "./out.template";

export type NodeTemplate = {
    width: number,
    height: number,
    controls: AnyControlTemplate[],
    defaultControlValues: any[], // TODO move to controls
    inputs: { type: "control" | "wave", name: string, onJoin?: (input: AudioNode, myId: number) => any }[],
    outputs: { type: "control" | "wave", name: string , getParam?:(myId:number)=>AudioNode}[],
    onCreate?: (idx:number)=>any
    // TODO and more
}

export const NODE_TEMPLATES: { [id: string]: NodeTemplate } = {
    gain: gainTemplate,
    osc: oscTemplate,
    out: outTemplate
}


export type ControlTemplate = {
    y: number,
    x: number,
    label: string,
    type: string
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
