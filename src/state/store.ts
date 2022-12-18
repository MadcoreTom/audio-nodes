import { configureStore, createSlice } from '@reduxjs/toolkit'
import { NODE_TEMPLATES } from '../nodes/templates';
export type Node = {
    x: number,
    y: number,
    id: number,
    template: string,
    controlValues: any[]
}

export type Selected = { type: "everything" } | { type: "node", idx: number } | {type:'wire',nodeIdx:number,isInput:boolean,ioIdx:number} | {type:"control", nodeIdx:number,label:string};

export type MainState = {
    nodes: Node[],
    dragTarget:  Selected| null,
    offset: number[],
    mousePos: number[],
    wires: {outNode:number, outIdx:number, inNode:number, inIdx:number}[]
}

export type RootState = {
    main: MainState
}

const mainSlice = createSlice({
    name: "main",
    initialState: {
        nodes: [],
        dragTarget: null,
        offset: [0, 0],
        mousePos:[0,0],
        wires: []
    },
    reducers: {
        mouseSelect: (state: MainState, action: { payload: Selected |null}) => {
            if (state.dragTarget == null || action.payload == null) {
                state.dragTarget = action.payload;
                console.log("Select drag", state.dragTarget)
            }
        },
        drag: (state: MainState, action: { payload: number[] }) => {
            const dragTarget = state.dragTarget;
            if (dragTarget) {
                switch (dragTarget.type) {
                    case "everything":
                        state.offset = [state.offset[0] + action.payload[0], state.offset[1] + action.payload[1]];
                        break;
                    case "node":
                        const n = state.nodes[dragTarget.idx];
                        state.nodes[dragTarget.idx] = {...n,x:n.x+action.payload[0],y:n.y+action.payload[1]};
                        break;
                    case "control":
                        {
                            const n = state.nodes[dragTarget.nodeIdx];
                            const t=NODE_TEMPLATES[n.template];
                            t.controls.forEach((c,idx)=>{
                               if(c.label == dragTarget.label && c.onDrag) {
                                const newValue = c.onDrag(action.payload[1], dragTarget.nodeIdx, n.controlValues[idx]);
                                const newControlValues = n.controlValues.map((v,i)=>i == idx ? newValue : v);
                                state.nodes[dragTarget.nodeIdx] = {...n, controlValues:newControlValues};
                               }
                            })                            
                        }
                        break;
                }
            }
            state.mousePos = [action.payload[2],action.payload[3]];
        },
        addNode:(state: MainState, action:{payload:{template:string}})=>{
            const id = state.nodes.length;
            state.nodes.push({
                id,
                x:0,
                y:0,
                template:action.payload.template,
                controlValues: [...NODE_TEMPLATES[action.payload.template].defaultControlValues] 
            });
            const onCreate = NODE_TEMPLATES[action.payload.template].onCreate;
            if(onCreate){
                onCreate(id);
            }
        },
        setControlValue:(state: MainState, action: { payload: { value: any, nodeIdx: number, label:string } })=>{
            console.log(`Setting control value to ${action.payload.value} for control ${action.payload.label} and node index ${action.payload.nodeIdx}`)
            const n = state.nodes[action.payload.nodeIdx];
            const t = NODE_TEMPLATES[n.template];
            const controlIdx=t.controls.findIndex(c=>c.label == action.payload.label);
            const newControlValues = n.controlValues.map((v,i)=>i == controlIdx ? action.payload.value : v);
            console.log("ControlValues", n.controlValues, newControlValues)
            state.nodes[action.payload.nodeIdx] = {...n,controlValues: newControlValues};
            const ctrl=t.controls[controlIdx];
            if(ctrl.onChange){
                ctrl.onChange(action.payload.value, action.payload.nodeIdx);
            }
        }
        ,
        joinWire: (state: MainState, action: { payload: { isInput: boolean, nodeIdx: number, ioIdx: number } }) => {
            // TODO block pluging into yourself, or loops, or connectors that don't support multiple
            if (state.dragTarget && state.dragTarget.type == "wire") {

                let startNodeIdx = action.payload.nodeIdx;
                let startIoIdx = action.payload.ioIdx;

                let endNodeIdx = state.dragTarget.nodeIdx;
                let endIoIdx = state.dragTarget.ioIdx;

                console.log("I",action.payload.isInput);
                if (action.payload.isInput) {
                    // swap
                    const a = startNodeIdx;
                    startNodeIdx = endNodeIdx;
                    endNodeIdx = a;
                    // swap
                    const b =startIoIdx;
                    startIoIdx=endIoIdx;
                    endIoIdx=b;
                } 
                const startCon = NODE_TEMPLATES[state.nodes[startNodeIdx].template].outputs[startIoIdx];
                const endCon = NODE_TEMPLATES[state.nodes[endNodeIdx].template].inputs[endIoIdx];
                if(endCon.onJoin && startCon.getParam){
                    console.log("Joining properly", startNodeIdx, startCon);
                    const tmp = startCon.getParam(startNodeIdx);
                    console.log("tmp",tmp);
                    endCon.onJoin(tmp, endNodeIdx);
                } else {
                    console.log("⚠ Cannot join")
                }
                const w = {
                    outNode: startNodeIdx,
                    outIdx: startIoIdx,
                    inNode: endNodeIdx,
                    inIdx: endIoIdx
                };
                console.log("W",w)

                state.wires.push(w);

                console.log("WIRE");
            } else {
                console.log("NOWIRE");
            }
        }
    }
});

export default configureStore({
    reducer: {
        main: mainSlice.reducer
    },
});

export const { mouseSelect, drag, joinWire,addNode,setControlValue } = mainSlice.actions;
