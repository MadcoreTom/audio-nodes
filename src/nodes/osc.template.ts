import { createDialControl } from "../components/dial.control";
import { SOUND } from "../soundsystem";
import { NodeTemplate } from "./templates";


export const lfoTemplate: NodeTemplate = createOscTemplate(0, 100);
export const hfoTemplate: NodeTemplate = createOscTemplate(100, 1500);


function createOscTemplate(min: number, max: number): NodeTemplate {
    return {
        width: 160,
        height: 120,
        controls: [
            createDialControl(40, 20, "freq", min, max, nodeIdx => (SOUND.getNode("" + nodeIdx) as OscillatorNode).frequency)
            , {
                type: "option",
                x: 90,
                y: 20,
                label: "shape",
                options: ["SIN", "SAW", "SQR"],
                onChange: (value: any, nodeIdx: number) => {
                    const node = (SOUND.getNode("" + nodeIdx) as OscillatorNode);
                    switch (value) {
                        case "SIN":
                            node.type = "sine";
                            break;
                        case "SAW":
                            node.type = "sawtooth";
                            break;
                        case "SQR":
                            node.type = "square";
                            break;
                    }
                }
            }],
        inputs: [{
            type: "wave",
            name: "detu",
            onJoin: (inputNode, myId) => {
                inputNode.connect((SOUND.getNode("" + myId) as OscillatorNode).detune)
            }
        }, {
            type: "control",
            name: "sync"
        }],
        outputs: [{
            type: "wave",
            name: "sig",
            getParam: (idx) => { console.log("Get para,", idx); return SOUND.getNode("" + idx) }
        }],
        defaultControlValues: [200, "SAW"],
        onCreate: (idx) => {
            SOUND.addNode("" + idx, ctx => {
                const osc = ctx.createOscillator() as OscillatorNode;
                osc.type = "sawtooth";
                osc.start();
                return osc;
            })
        }
    };
}