import { SOUND } from "../soundsystem";
import { NodeTemplate } from "./templates";

export const oscTemplate: NodeTemplate = {
    width: 100,
    height: 150,
    controls: [{
        type: "dial",
        x: 20,
        y: 20,
        label: "freq",
        min: 100,
        max: 1000
    }, {
        type: "option",
        x: 120,
        y: 20,
        label: "shape",
        options: ["SIN", "SAW", "SQR"]
    }],
    inputs: [{
        type: "wave",
        name: "freq"
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
    onCreate:(idx)=>{
        SOUND.addNode(""+idx,ctx=>{
            const osc = ctx.createOscillator();
            osc.shape = "sawtooth"
            osc.start();
            return osc;
        } )
    }
}