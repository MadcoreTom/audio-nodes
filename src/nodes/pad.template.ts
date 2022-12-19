import { SOUND } from "../soundsystem";
import { NodeTemplate } from "./templates";

export const padTemplate : NodeTemplate = {
    width: 100,
    height: 100,
    controls: [
        {
            type: "option",
            x: 30,
            y:50,
            options: ["X"],
            label:"pad",
            onChange: (value,nodeIdx:number)=>{
                SOUND.trigger(""+nodeIdx + "TRG",SOUND.now())
            }
        }
    ],
    defaultControlValues:[1],
    inputs: [],
    outputs: [
        {
            type:"trigger",
            name:"TRG"
        }
    ]
}