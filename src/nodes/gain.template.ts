import { createDialControl } from "../components/dial.control";
import { SOUND } from "../soundsystem";
import { NodeTemplate } from "./templates";

export const gainTemplate: NodeTemplate = {
    width: 140,
    height: 80,
    controls: [
    createDialControl(50, 10, "gain", 0, 100, idx => (SOUND.getNode("" + idx) as GainNode).gain)
    ],
    inputs: [{
        type: "wave",
        name: "sig",
        onJoin: (inputNode, myId) => {
            inputNode.connect(SOUND.getNode("" + myId) as GainNode)
        }
    },{
        type: "wave",
        name: "gain",
        onJoin: (inputNode, myId) => {
            inputNode.connect((SOUND.getNode("" + myId) as GainNode).gain)
        }
    }],
    outputs: [{
        type: "wave",
        name: "sig",
        getParam: idx => (SOUND.getNode("" + idx) as GainNode)
    }],
    defaultControlValues: [0.5],
    onCreate: idx => {
        SOUND.addNode("" + idx, (ctx: AudioContext) => ctx.createGain())
    }
}