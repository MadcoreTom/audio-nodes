export type NodeTemplate = {
    width: number,
    height:number,
    controls: AnyControlTemplate[],
    inputs: {type:"control"|"wave", name:string}[],
    outputs: {type:"control"|"wave", name:string}[]
    // TODO and more
}

export const NODE_TEMPLATES: {[id:string]:NodeTemplate} = {
    gain: {
        width: 80,
        height:50,
        controls: [],
        inputs: [{
            type:"wave",
            name:"gain"
        }],
        outputs:[{
            type:"wave",
            name:"sig"
        }]
    },
    osc: {
        width: 100,
        height: 150,
        controls: [{
            type:"dial",
            x:20,
            y:20,
            label: "freq",
            min: 100,
            max:1000
        },{
            type:"option",
            x:120,
            y:20,
            label: "shape",
            options: ["SIN","SAW","SQR"]
        }],
        inputs: [{
            type:"wave",
            name:"freq"
        },{
            type:"control",
            name:"sync"
        }],
        outputs:[{
            type:"wave",
            name:"sig"
        }]
    }, 
    out: {
        width: 50,
        height: 50,
        controls: [],
        inputs: [{type:"wave", name:"sig"}],
        outputs:[]
    }
}


export type ControlTemplate ={
    y:number,
    x:number,
    label:string,
    type: string
}

export type DialControlTemplate = ControlTemplate & {
    type: "dial",
    min:number,
    max:number
}

export type OptionControlTemplate = ControlTemplate & {
    type: "option",
    options:string[]
}

export type AnyControlTemplate = DialControlTemplate | OptionControlTemplate;
