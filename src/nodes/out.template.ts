import { SOUND } from "../soundsystem";
import { NodeTemplate } from "./templates";

export const outTemplate: NodeTemplate = {
    width: 50,
    height: 50,
    controls: [],
    inputs: [{
        type: "wave",
        name: "sig",
        onJoin: (input: AudioNode, myId: number) => {
            input.connect(SOUND.output);
        }
    }],
    outputs: [],
    defaultControlValues: [],
}