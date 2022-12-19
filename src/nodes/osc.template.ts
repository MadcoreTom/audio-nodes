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
            createDialControl(40, 20, "freq", min, max, nodeIdx => getOscNode(nodeIdx).frequency)
            , {
                type: "option",
                x: 90,
                y: 20,
                label: "shape",
                options: ["SIN", "SAW", "SQR", "TRI"],
                onChange: (value: any, nodeIdx: number) => {
                    const node = getOscNode(nodeIdx);
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
                        case "TRI":
                            node.type = "triangle";
                            break;
                    }
                }
            }],
        inputs: [{
            type: "wave",
            name: "detu",
            onJoin: (inputNode, myId) => {
                inputNode.connect(getOscNode(myId).detune)
            }
        }, {
            type: "control",
            name: "sync",
            trigger: (time: number, myId: number) => {
                getDelayNode(myId).delayTime.setValueAtTime(time % (1/getOscNode(myId).frequency.value),time);
                console.log("Sync triggered")
            }
        }],
        outputs: [{
            type: "wave",
            name: "sig",
            getParam: (idx) => { console.log("Get para,", idx); return getDelayNode(idx) }
        }],
        defaultControlValues: [200, "SAW"],
        onCreate: (idx) => {
            SOUND.addNode(idx + "-osc", ctx => {
                const osc = ctx.createOscillator() as OscillatorNode;
                osc.type = "sawtooth";
                osc.start();
                return osc;
            });
            SOUND.addNode(idx + "-del", (ctx:AudioContext) => {
                return ctx.createDelay(5);
            });
            getOscNode(idx).connect(getDelayNode(idx));
        }
    };
}

function getOscNode(idx: number) {
    return SOUND.getNode(idx + "-osc") as OscillatorNode
}
function getDelayNode(idx: number) {
    return SOUND.getNode(idx + "-del") as DelayNode
}