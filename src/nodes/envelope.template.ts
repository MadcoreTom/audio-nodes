import { createDialControl } from "../components/dial.control";
import { SOUND } from "../soundsystem";
import { setControlValue } from "../state/store";
import { NodeTemplate } from "./templates";

export const envelopeTemplate: NodeTemplate = {
    width: 100,
    height: 300,
    controls: [
        {
            x:10,
            y:10,
            label: "attack",
            min:0,
            max:1,
            type:"dial",
            onDrag:(delta, nodeIdx, curValue) =>{
                const step = (1-0)/250;
                const value = Math.min(1,Math.max(0,curValue + delta*step));
                return value;
            }
        }
        // TODO sustain and release
    ],
    defaultControlValues: [0.5],
    inputs: [
        {
            type: "control",
            name: "TRG",
            trigger: (time, id, controlValues) => {
                console.log("Trigger Envelope");
                const node = SOUND.getNode("" + id) as ConstantSourceNode;
                const now = SOUND.now();
                node.offset.cancelAndHoldAtTime(now);
                node.offset.linearRampToValueAtTime(1, now + controlValues[0] as number);
                node.offset.linearRampToValueAtTime(0, now + (controlValues[0] as number) *2);// TODO just until l we get the other controls going
            }
        }
    ],
    outputs: [
        {
            type: "wave",
            name: "vol",
            getParam: (id) => {
                return SOUND.getNode("" + id);
            }
        }
    ],
    onCreate: (idx) => {
        SOUND.addNode("" + idx, ctx => {
            const a = ctx.createConstantSource()
            a.offset.setValueAtTime(0, SOUND.now());
            a.start();
            return a;
        })
    },
}