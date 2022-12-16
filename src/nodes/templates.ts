export type NodeTemplate = {
    width: number,
    height:number,
    controls: AnyControlTemplate[]
    // TODO and more
}

export const NODE_TEMPLATES: {[id:string]:NodeTemplate} = {
    gain: {
        width: 50,
        height:50,
        controls: []
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
            type:"dial",
            x:120,
            y:20,
            label: "freq",
            min: 100,
            max:1000
        }]
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

export type AnyControlTemplate = DialControlTemplate;
