import { SOUND } from "../soundsystem";
import { NodeTemplate } from "./templates";

export const gainTemplate :NodeTemplate= {
    width: 140,
    height: 80,
    controls: [{
        type: "dial",
        x:50,
        y:10,
        label:"gain",
        min:0,
        max:1
    }],
    inputs: [{
        type: "wave",
        name: "sig",
        onJoin:(inputNode,myId)=>{
            inputNode.connect(SOUND.getNode(""+myId) as GainNode)
        }
    }],
    outputs: [{
        type: "wave",
        name: "sig",
        getParam: idx=>(SOUND.getNode(""+idx) as GainNode)
    }],
    defaultControlValues: [0.5],
    onCreate: idx=>{
        SOUND.addNode(""+idx, (ctx:AudioContext)=>ctx.createGain())
    }
}